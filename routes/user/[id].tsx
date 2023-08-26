import { PageProps } from "$fresh/server.ts";
import User from "~/islands/User.tsx";

export default function ({ params: { id } }: PageProps) {
  return <User id={id} />;
}
