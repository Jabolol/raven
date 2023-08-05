import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <title>raven | BeReal client</title>
      </Head>
      <Component />
    </>
  );
}
