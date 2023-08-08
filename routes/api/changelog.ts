/// <reference lib="deno.unstable" />

import { HandlerContext } from "$fresh/server.ts";
import {
  type ChangeLogResponse,
  type GitHubCommits,
  type GitHubDeployments,
  type KvCache,
} from "../../types.ts";

export const handler = async (
  req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  if (req.method !== "GET") {
    return new Response(null, { status: 405 });
  }

  const kv = await Deno.openKv();

  const { value: cached } = await kv.get<KvCache>(["commits_cache"]);

  let allDeployments: GitHubDeployments | null = null;

  if (
    cached &&
    cached.data &&
    Date.now() - cached.timestamp.getTime() <= 60 * 60 * 1000
  ) {
    allDeployments = cached.data;
  }

  if (!allDeployments) {
    const deploymentRequest = await fetch(
      "https://api.github.com/repos/Jabolol/raven/deployments",
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Deno.env.get("GITHUB_TOKEN")}`,
        },
      },
    );

    if (!deploymentRequest.ok) {
      kv.close();
      return new Response(null, { status: 500 });
    }

    allDeployments = await deploymentRequest.json() as GitHubDeployments;
    await kv.set(["commits_cache"], {
      data: allDeployments,
      timestamp: new Date(),
    });
  }

  if (!allDeployments) {
    kv.close();
    return new Response(null, { status: 500 });
  }

  const [{ sha: latest }, { sha: previous }] = allDeployments;

  const { value } = await kv.get<ChangeLogResponse>([
    "changelog",
    `${previous}:${latest}`,
  ]);

  if (value) {
    kv.close();
    return new Response(JSON.stringify(value, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const commitsRequest = await fetch(
    "https://api.github.com/repos/Jabolol/raven/commits",
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Deno.env.get("GITHUB_TOKEN")}`,
      },
    },
  );

  if (!commitsRequest.ok) {
    kv.close();
    return new Response(null, { status: 500 });
  }

  const commits = await commitsRequest.json() as GitHubCommits;

  const result = commits.slice(
    commits.findIndex((item) => item.sha === latest),
    commits.findIndex((item) => item.sha === previous) + 1,
  ).map(({ sha, commit: { message, url } }) => ({ sha, message, url }));

  await kv.set(["changelog", `${previous}:${latest}`], result);

  kv.close();

  return new Response(JSON.stringify(result, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
