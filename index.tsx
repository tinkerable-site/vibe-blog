import { Toc } from "./App";
import "./styles.css";
import { boot } from "@tinkerable/internal/v1/boot";

boot({
  routes: {
    toc: Toc,
  },
});
