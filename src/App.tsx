import { Input } from "./components/ui/input";
import { SearchIcon, CopyIcon, StarIcon } from "lucide-react";
import { Button } from "./components/ui/button";
import {
  useSearchGithubUser,
  ActionType,
  getUserRepo,
} from "./hooks/use-user-query";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import {
  useRive,
  EventType,
  Alignment,
  Layout,
  Fit,
  useStateMachineInput,
} from "@rive-app/react-canvas";
import { MouseEvent, MouseEventHandler, useState } from "react";
import { BgApp, BgApp2, IconsEmpty } from "./components/bg-app";
import TypingText from "./components/typing-text";
import { Skeleton } from "./components/ui/skeleton";
import { motion } from "framer-motion";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { AspectRatio } from "./components/ui/aspect-ratio";
function App() {
  const {
    listUser,
    form,
    onSubmit,
    actionType,
    retry,
    user,
    getRepo,
    setActiveUser,
  } = useSearchGithubUser();

  const { rive, RiveComponent } = useRive({
    src: "frog.riv",
    artboard: "Frog Captcha",
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.TopCenter,
      layoutScaleFactor: 5,
    }),
    // layout: new Layout({
    //   fit: Fit.Layout,
    //   layoutScaleFactor: 2, // 2x scale of the layout, when using `Fit.Layout`. This allows you to resize the layout as needed.
    // }),
  });
  const bumpInput = useStateMachineInput(rive, "State Machine 1", "Tongue");
  const numX = useStateMachineInput(rive, "State Machine 1", "numX");
  const numY = useStateMachineInput(rive, "State Machine 1", "numY");
  const handlePointerMove = (event: MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.target.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    requestAnimationFrame(() => {
      if (numX && numY) {
        numX.value = Math.max(0, Math.min(event.clientX, 100));
        numY.value = Math.max(0, Math.min(centerY - event.clientY, 100));
      }
    });
  };
  const handleClick = (event) => {
    console.log(bumpInput);
    bumpInput?.fire();
  };

  // Wait until the rive object is instantiated before adding the Rive
  // event listener
  const [show, setShow] = useState(false);
  const onGetUser = actionType == ActionType.GET_USER;
  const onGetUserRepo = actionType == ActionType.GET_USER_REPO;

  return (
    <main className="flex flex-col h-[100vh]">
      <div className="relative overflow-hidden w-full h-full flex flex-col items-center">
        <div
          className="h-full w-full absolute left-0 right-0 bg-gradient-to-bl from-teal-400 to-yellow-200"
          onMouseMove={handlePointerMove}
        >
          <RiveComponent
            onClick={handleClick}
            className="w-full h-full relative -translate-x-1/3"
          />
        </div>
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
            <BgApp className="absolute w-1/3 -top-0 -right-10 -rotate-[45deg]" />
            <BgApp2 className="absolute w-1/3 -top-5 -left-10 rotate-[45deg]" />
            <div className="flex flex-col w-full px-10 gap-y-10 mt-auto transition duration-700 bg-white/10 backdrop-blur-[2px]">
              <TypingText
                text="Stay Updates for Repo Updates!!"
                className="text-3xl font-semibold"
                repeat={false}
              ></TypingText>
              <form
                className="group relative w-full max-w-lg"
                onSubmit={onSubmit}
              >
                <Input
                  className="pr-[120px] h-14 bg-white"
                  {...form.register("search")}
                  placeholder="who are you looking for?"
                  disabled={onGetUser}
                />
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
            </div>
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
                listUser.map((d) => (
                  <div
                    key={d.id}
                    className="flex group/user space-x-4 hover:bg-gray-100 px-4 py-3 rounded-md cursor-pointer transition duration-700"
                    onClick={() => {
                      getRepo(d);
                    }}
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
                        <Button variant="ghost" size="icon" className="size-6">
                          <CopyIcon />
                        </Button>
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
      <Drawer
        open={Boolean(user)}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setActiveUser("");
          }
        }}
      >
        <DrawerContent className="h-[90vh] px-5 lg:px-10 py-5 bg-neutral-50 overflow-hidden">
          <DrawerHeader className="hidden">
            <DrawerTitle></DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>

          <div className="w-full h-full bg-transparent overflow-hidden overflow-y-auto no-scrollbar pb-20">
            <div className=" flex flex-col">
              <Avatar className="h-10 w-10 rounded-full overflow-hidden">
                <AvatarImage src={user?.profile.avatar_url} />
                <AvatarFallback>US</AvatarFallback>
              </Avatar>
              <p className="text-xs font-bold tex-gray-500 capitalize">
                {user?.profile.login}
              </p>
              <div className="flex items-center gap-x-2">
                <p className="text-xs font-bolder text-gray-500 group-hover/user:text-gray-800 transition duration-300">
                  {user?.profile.url}
                </p>
                <Button variant="ghost" size="icon" className="size-6">
                  <CopyIcon />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-5 ">
              {user?.repo.map((repo) => (
                <div className="shadow-sm relative  space-y-5 bg-white rounded-xl cursor-pointer overflow-hidden">
                  <AspectRatio
                    ratio={1}
                    className="flex items-center overflow-hidden rounded-md z-0"
                  >
                    <Avatar
                      className="object-cover -mt-2
                      "
                    >
                      <AvatarImage
                        src={
                          repo.language
                            ? `https://cdn.jsdelivr.net/npm/programming-languages-logos/src/${repo.language?.toLowerCase()}/${repo.language?.toLowerCase()}.png`
                            : `https://cdn.jsdelivr.net/npm/programming-languages-logos/src/programming-languages.png`
                        }
                      />
                      <AvatarFallback className="text-[50px] absolute opacity-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        {repo.language}
                      </AvatarFallback>
                    </Avatar>
                  </AspectRatio>
                  <p className="font-gordita absolute  text-[10px] top-2 right-2 bg-emerald-500 px-2 py-1 shadow-sm w-fit rounded text-white">
                    {repo.private ? "Private" : "Public"}
                  </p>
                  <div className="space-y-3 relative p-5 -mt-14 bg-white">
                    <p className="capitalize font-gordita text-sm">
                      {repo.name}
                    </p>
                    <div className="flex items-center gap-2 text-xs">
                      <StarIcon className="size-4 stroke-none fill-orange-300" />
                      <p className="font-gordita font-bold">
                        {repo.stargazers_count}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </main>
  );
}

export default App;
