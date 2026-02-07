import { Toc } from "./App";
import "./styles2.css";
import { boot } from "@tinkerable/internal/boot";

boot({
  routingSpec: {
    aliases: {
      "/index.tsx": "/pages/landing.tsx",
    },
    routes: {
      toc: Toc,
    },
  },
});
