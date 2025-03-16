import { Suspense } from "react";
import { DotSpinner } from "./icons";

const Loadable = (Component: React.FC) =>
  function WithLoader(props: typeof Component.arguments) {
    return (
      <Suspense fallback={<DotSpinner />}>
        <Component {...(props || {})} />
      </Suspense>
    );
  };

export default Loadable;
