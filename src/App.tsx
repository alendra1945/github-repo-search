import { useSearchGithubUser, ActionType } from "@/hooks/use-user-query";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { BgApp, BgApp2, IconsEmpty } from "./components/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { FrogAnimation } from "@/components/frog-animation";
import { UserRepoPanel } from "@/components/user-repo-panel";
import { CopyBtn } from "./components/copy-btn";
import { testId } from "./lib/test-id";
import { SearchUserForm } from "./components/search-user-form";
import { ListUser } from "./components/list-user";
function App() {
  const { listUser, actionType, retry, getRepo } = useSearchGithubUser();
  const onGetUser = actionType == ActionType.GET_USER;

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
