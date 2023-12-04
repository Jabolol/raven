import { Plugin } from "$fresh/server.ts";
import { STYLE_ELEMENT_ID } from "$fresh/plugins/twind/shared.ts";

export default {
  name: "inject",
  entrypoints: {
    manifest:
      `data:application/javascript,export default function e({type:e,...t}){let n=document.createElement(e);for(let[a,f]of Object.entries(t))n[a]=f;document.head.append(n)};`,
    dark:
      `data:application/javascript,export default function(){const e=window.matchMedia("(prefers-color-scheme: dark)");e.addEventListener("change",()=>{e.matches?document.body.classList.add("dark"):document.body.classList.remove("dark")}),e.matches&&document.body.classList.add("dark")};`,
  },
  render: ({ render }) => {
    render();
    return {
      scripts: [{
        entrypoint: "manifest",
        state: {
          type: "link",
          rel: "manifest",
          href: "/site.webmanifest",
        },
      }, {
        entrypoint: "dark",
        state: {},
      }],
      styles: [{
        cssText: "html {scroll-behavior: smooth; overflow-x: hidden;}",
        id: STYLE_ELEMENT_ID,
      }],
    };
  },
} satisfies Plugin;
