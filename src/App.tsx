import { lazy } from "react";
import Loadable from "@/components/loadable";
import { BgApp, BgApp2 } from "@/components/icons";
import { motion } from "framer-motion";

const SearchUserForm = Loadable(
  lazy(() => import("@/components/search-user-form"))
);
const UserRepoPanel = Loadable(
  lazy(() => import("@/components/user-repo-panel"))
);
const ListUser = Loadable(lazy(() => import("@/components/list-user")));
const FrogAnimation = Loadable(
  lazy(() => import("@/components/frog-animation"))
);
function App() {
  return (
    <main className="flex flex-col h-[100vh]">
      <div className="relative overflow-hidden w-full h-full flex flex-col items-center">
        <FrogAnimation />
        <div className="flex flex-col items-center justify-center relative w-full h-full p-2 lg:p-5 pointer-events-none">
          <motion.div
            initial={{
              y: 100,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.5,
              },
            }}
            className="relative overflow-hidden pointer-events-auto bg-linear-to-tr from-white to-gray-100 w-full h-full  max-w-xl max-h-[90vh] lg:max-h-[80vh] rounded-xl shadow-lg py-5 flex flex-col justify-center gap-y-8"
          >
            <BgApp className="absolute w-[150px] max-w-xs -top-0 -right-10 -rotate-[45deg]" />
            <BgApp2 className="absolute w-[150px] max-w-xs -top-5 -left-10 -rotate-[90deg]" />
            <SearchUserForm />
            <ListUser />
          </motion.div>
        </div>
      </div>
      <UserRepoPanel />
    </main>
  );
}

export default App;
