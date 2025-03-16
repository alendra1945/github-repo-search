import { CopyIcon, StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchGithubUser, ActionType } from "@/hooks/use-user-query";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { IconsEmpty } from "@/components/icons";

export const UserRepoPanel = () => {
  const { actionType, user, setActiveUser } = useSearchGithubUser();

  const onGetUserRepo = actionType == ActionType.GET_USER_REPO;

  return (
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

          {(onGetUserRepo || Boolean(user?.repo.length)) && (
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-5">
              {!onGetUserRepo &&
                user?.repo.map((repo) => (
                  <div className="shadow-sm relative  space-y-5 bg-white rounded-xl cursor-pointer overflow-hidden">
                    <AspectRatio
                      ratio={1}
                      className="flex items-center overflow-hidden rounded-md z-0"
                    >
                      <Avatar className="w-full h-full rounded-none">
                        <AvatarImage
                          className="object-cover"
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
                    <p className="font-gordita absolute  text-[10px] top-6 right-2 bg-emerald-500 px-2 py-1 shadow-sm w-fit rounded text-white">
                      {repo.private ? "Private" : "Public"}
                    </p>
                    <div className="space-y-3 relative p-5 -mt-14 bg-white border-t-2 border-gray-100/50 rounded-t-xl">
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
              {onGetUserRepo &&
                Array.from({ length: 12 }).map((_, idx) => (
                  <div
                    key={`${idx}`}
                    className="shadow-sm relative  space-y-5 bg-white rounded-xl cursor-pointer overflow-hidden"
                  >
                    <div className="flex flex-col space-y-3">
                      <Skeleton className="h-[125px] w-[250px]" />
                      <div className="space-y-2 p-5">
                        <Skeleton className="h-4 w-full max-w-[200px]" />
                        <Skeleton className="h-4 w-full max-w-[100px]" />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {!onGetUserRepo && !user?.repo.length && (
            <IconsEmpty className="w-full max-w-[200px] mx-auto" />
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
