import type { JSX } from "react";
import React, { Suspense } from "react";
import { SandboxRouter, Path } from "@tinkerable/internal/v1";
import { Routes, Route } from "react-router";

export const Toc = (): JSX.Element => {
  console.log("ASDFASDF");
  const MyTOC = React.lazy(() => module.dynamicImport("./pages/toc.mdx", "*"));
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section>
        <MyTOC />
      </section>
    </Suspense>
  );
};

export const App = (): React.JSX.Element => {
  return (
    <SandboxRouter>
      <Routes>
        <Route index element={<Toc />} />
        {/* Treat index.tsx as a special case to avoid circular imports */}
        <Route path="/index.tsx" element={<Toc />} />
        <Route path="*" element={<Path />} />
      </Routes>
    </SandboxRouter>
  );
};
