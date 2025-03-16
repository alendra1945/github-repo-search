import { useSearchGithubUser, ActionType } from "@/hooks/use-user-query";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { IconsEmpty } from "@/components/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { CopyBtn } from "@/components/copy-btn";
import { testId } from "@/lib/test-id";
export default function ListUser() {
  const { listUser, actionType, retry, getRepo } = useSearchGithubUser();
  const onGetUser = actionType == ActionType.GET_USER;
  return (
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
              <p className="text-xs font-bold tex-gray-500">{d.login}</p>
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
  );
}
