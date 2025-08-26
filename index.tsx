import { Toc } from "./App";
import "./styles.css";
import { boot } from "@tinkerable/internal/boot";

boot({
  routes: {
    toc: Toc,
  },
});
