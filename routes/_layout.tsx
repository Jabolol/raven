import Navbar from "~/islands/Navbar.tsx";
import Footer from "~/components/Footer.tsx";
import { LayoutProps } from "$fresh/server.ts";

export default function ({ Component }: LayoutProps) {
  return (
    <main className="bg-white dark:bg-gray-800 min-h-screen">
      <Navbar />
      <Component />
      <Footer />
    </main>
  );
}
