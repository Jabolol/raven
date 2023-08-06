import { PageProps } from "$fresh/server.ts";
import Info from "../../islands/Info.tsx";

export default function Greet({ params: { id } }: PageProps) {
  return <Info id={id} />;
}
