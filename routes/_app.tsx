import { PageProps } from "$fresh/server.ts";
import { asset, Head } from "$fresh/runtime.ts";

export default function ({ Component }: PageProps) {
  return (
    <>
      <Head>
        <title>raven | BeReal client</title>
        <meta name="title" content="raven | BeReal client" />
        <meta
          name="description"
          content="See your friends BeReals without posting, and more!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://raven.deno.dev/" />
        <meta property="og:title" content="raven | BeReal client" />
        <meta
          property="og:description"
          content="See your friends BeReals without posting, and more!"
        />
        <meta property="og:image" content={asset(`/raven.png`)} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://raven.deno.dev/" />
        <meta property="twitter:title" content="raven | BeReal client" />
        <meta
          property="twitter:description"
          content="See your friends BeReals without posting, and more!"
        />
        <meta property="twitter:image" content={asset(`/raven.png`)} />
        <meta name="theme-color" content="#27272A" />
        <link rel="icon" type="image/svg" href={asset("/raven.png")} />
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <Component />
    </>
  );
}
