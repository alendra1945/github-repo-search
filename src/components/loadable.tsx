import { Suspense } from "react";

const Loadable = (Component: React.FC) =>
  function WithLoader(props: typeof Component.arguments) {
    return (
      <Suspense fallback={<></>}>
        <Component {...(props || {})} />
      </Suspense>
    );
  };

export default Loadable;
