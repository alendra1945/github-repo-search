import { ExternalLinkIcon, StarIcon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getRandomColorById } from "@/lib/utils";
import { FolderIcon } from "./icons";
export const UserRepoCard = ({
  git_url,
  language,
  isPrivate,
  name,
  star,
  index,
}: {
  name: string;
  star: number;
  git_url: string;
  language: string;
  isPrivate: boolean;
  index: number;
}) => {
  return (
    <div
      className="group/repocard relative space-y-5 min-h-[200px] bg-white rounded-xl cursor-pointer overflow-hidden"
      style={{
        background: getRandomColorById(index),
      }}
    >
      <div className="relative w-full h-[30px] px-5 py-5 bg-white rounted-br-xl">
        <div className="flex items-center gap-2 text-xs">
          <StarIcon className="size-4 stroke-none fill-orange-300" />
          <p className="font-gordita font-bold">{star}</p>
        </div>
      </div>
      <Avatar className="absolute opacity-30  bottom-0 right-0 w-1/2 h-auto rounded-none">
        <AvatarImage
          className="object-cover"
          src={`https://cdn.jsdelivr.net/npm/programming-languages-logos/src/${language?.toLowerCase()}/${language?.toLowerCase()}.png`}
        />
        <AvatarFallback className="text-[50px] absolute opacity-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <FolderIcon />
        </AvatarFallback>
      </Avatar>
      <p className="font-gordita absolute  text-[10px] top-2 right-2 bg-emerald-500 px-2 py-1 shadow-sm w-fit rounded text-white">
        {isPrivate ? "Private" : "Public"}
      </p>
      <div className="space-y-3 relative p-5 border-gray-100/50">
        <p className="capitalize font-gordita break-word font-semibold text-sm break-word text-white">
          {name}
        </p>
      </div>
      <div
        className="w-full h-full top-0 h-0 absolute items-center justify-center z-[10] bg-white/60 hidden opacity-0 group-hover/repocard:opacity-100 group-hover/repocard:flex duration-700"
        onClick={() => window.open(git_url.replace("git:", "https:"), "_blank")}
      >
        <ExternalLinkIcon className="size-24 opacity-50 text-white" />
      </div>
    </div>
  );
};
