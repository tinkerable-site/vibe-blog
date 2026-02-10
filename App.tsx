import type { JSX } from "react";
import { Suspense, lazy } from "react";

export const Toc = (): JSX.Element => {
  console.log("ASDFASDF");
  // @ts-ignore
  const MyTOC = lazy(() => module.dynamicImport("./pages/landing.tsx", "*"));
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section>
        <MyTOC />
      </section>
    </Suspense>
  );
};

export default Toc;
