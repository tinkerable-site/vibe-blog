import type { JSX } from "react";
import { Suspense, lazy } from "react";

export const Toc = (): JSX.Element => {
  console.log("ASDFASDF");
  // @ts-ignore
  const MyTOC = lazy(() => module.dynamicImport("./pages/toc.mdx", "*"));
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section>
        <MyTOC />
      </section>
    </Suspense>
  );
};
