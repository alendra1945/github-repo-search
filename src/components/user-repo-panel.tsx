import { useSearchGithubUser, ActionType } from "@/hooks/use-user-query";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { IconsEmpty } from "@/components/icons";
import { CardUser } from "./card-user";
import { UserRepoCard } from "./user-repo-card";

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
      <DrawerContent className="h-[90vh] py-5 px-2 bg-neutral-50 overflow-hidden focus-visible:ring-transparent">
        <DrawerHeader className="hidden">
          <DrawerTitle></DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 h-full w-full overflow-y-auto lg:overflow-hidden no-scrollbar">
          <CardUser />
          <div className="lg:col-span-2 px-5 h-fit lg:h-full bg-transparent overflow-hidden lg:overflow-y-auto  pb-20">
            {(onGetUserRepo || Boolean(user?.repo.length)) && (
              <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-6 gap-5">
                {!onGetUserRepo &&
                  user?.repo.map((repo, index) => (
                    <UserRepoCard
                      key={repo.git_url}
                      name={repo.name}
                      git_url={repo.git_url}
                      language={repo.language?.toLowerCase() || ""}
                      isPrivate={repo.private}
                      star={repo.stargazers_count}
                      index={index}
                    />
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
        </div>
      </DrawerContent>
    </Drawer>
  );
};
