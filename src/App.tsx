import { Input } from "./components/ui/input";
import { SearchIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchGithubUser, ActionType } from "@/hooks/use-user-query";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { BgApp, BgApp2, IconSearchPage, IconsEmpty } from "./components/icons";
import TypingText from "@/components/typing-text";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { FrogAnimation } from "@/components/frog-animation";
import { UserRepoPanel } from "@/components/user-repo-panel";
import { CopyBtn } from "./components/copy-btn";
import { testId } from "./lib/test-id";
function App() {
  const { listUser, form, onSubmit, actionType, retry, getRepo } =
    useSearchGithubUser();
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

            <motion.div className="relative flex flex-col w-full px-10 gap-y-10 mt-auto transition duration-700 bg-white/10 backdrop-blur-[2px]">
              <IconSearchPage className="absolute -top-14 left-1/2 -translate-x-1/2 -translate-y-[100%] w-[300px] opacity-80 h-[200px] max-w-sm mx-auto" />
              <TypingText
                text="Stay Updates for Repo Updates!!"
                className="text-2xl max-w-sm font-semibold"
                repeat={false}
              ></TypingText>
              <form
                className="group relative w-full max-w-lg"
                onSubmit={onSubmit}
                {...testId("form-user-search")}
              >
                <Input
                  className="pr-[120px] h-14 bg-white focus-visible:ring-transparent"
                  {...form.register("search")}
                  placeholder="who are you looking for?"
                  disabled={onGetUser}
                  {...testId("input-user-search")}
                />
                {form.getValues("search") && (
                  <Button
                    type="button"
                    className="absolute right-[105px] top-1/2 -translate-y-1/2 size-6 [&_svg]:size-4"
                    variant="ghost"
                    size="icon"
                    onClick={() => form.setValue("search", "")}
                  >
                    <XIcon />
                  </Button>
                )}

                <Button
                  disabled={onGetUser}
                  className="absolute right-0 top-0 cursor-pointer h-full rounded-l-none font-bold text-base bg-[#167364] hover:bg-[#167364] w-[100px]"
                >
                  <SearchIcon className="translate-x-[500px] absolute group-hover:translate-x-0 size-6 transition duration-300" />
                  <span className="translate-x-0 group-hover:translate-x-[500px] transition duration-300">
                    Find
                  </span>
                </Button>
              </form>
            </motion.div>
            <div className="flex flex-col gap-y-5 overflow-y-auto px-8 no-scrollbar">
              {onGetUser &&
                Array.from({ length: 5 }).map((_, idx) => (
                  <div key={`${idx}`}>
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                  </div>
                ))}
              {!onGetUser &&
                listUser.map((d, idx) => (
                  <div
                    key={d.id}
                    className="flex group/user space-x-4 hover:bg-gray-100 px-4 py-3 rounded-md cursor-pointer transition duration-700"
                    onClick={() => {
                      getRepo(d);
                    }}
                    {...testId(`github-user-${idx}`)}
                  >
                    <Avatar className="h-10 w-10 rounded-full overflow-hidden">
                      <AvatarImage src={d.avatar_url} />
                      <AvatarFallback>US</AvatarFallback>
                    </Avatar>
                    <div className="">
                      <p className="text-xs font-bold tex-gray-500">
                        {d.login}
                      </p>
                      <div className="flex items-center gap-x-2">
                        <p className="text-xs font-bolder text-gray-500 group-hover/user:text-gray-800 transition duration-300">
                          {d.url}
                        </p>
                        <CopyBtn
                          value={d.url}
                          isPlain
                          className="size-5 [&_svg:not([class*='size-'])]:size-3 hover:bg-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              {!onGetUser && !!retry && !listUser.length && (
                <IconsEmpty className="w-full max-w-[200px] mx-auto" />
              )}
            </div>
            <div></div>
          </motion.div>
        </div>
      </div>
      <UserRepoPanel />
    </main>
  );
}

export default App;
