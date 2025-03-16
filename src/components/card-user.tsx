import { useSearchGithubUser } from "@/hooks/use-user-query";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { CopyBtn } from "./copy-btn";
import { useEffect, useRef, useState } from "react";
import { calculateFontSize } from "@/lib/utils";

export const CardUser = () => {
  const { user } = useSearchGithubUser();
  const [fontSize, setFontSize] = useState(100);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const mutationObserverCallback = () => {
    if (!cardRef.current) {
      return;
    }
    const boud = cardRef.current.getBoundingClientRect();
    setFontSize(calculateFontSize(boud.width, boud.height, 100, 0.6));
  };
  const login = Boolean(user);
  useEffect(() => {
    console.log("alen", cardRef.current);
    if (!login || !cardRef.current) {
      return;
    }
    try {
      const observer = new MutationObserver(mutationObserverCallback);
      observer.observe(cardRef.current, {
        attributes: true,
        childList: true,
        subtree: true,
        attributeFilter: ["style", "class"],
        characterData: true,
      });
    } catch (err) {
      console.log(err);
    }
  }, [login]);

  return (
    <div
      className="relative min-h-[300px] overflow-hidden shadow-lg rounded-xl bg-gradient-to-r from-rose-100 to-teal-100 flex flex-col items-center"
      ref={cardRef}
    >
      <div className="shadow-smd shrink-0 bg-white h-[150px] w-full rounded-br-full p-2 mb-0 flex">
        <div className="flex items-center gap-x-2">
          <p className="text-lg opacity-70 font-gordita font-semibold bg-gradient-to-b from-gray-900 to-gray-600 bg-clip-text capitalize">
            {user?.profile.login}
          </p>
          <CopyBtn value={user?.profile.url || ""} isPlain />
        </div>
      </div>
      <Avatar className="w-full absolute top-[150px] right-[50px] -translate-y-1/2 h-auto max-w-[150px] shadow-xl  overflow-hidden">
        <AvatarImage src={user?.profile.avatar_url} />
        <AvatarFallback>US</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-center gap-2 p-5">
        <p
          className="mt-[75px] break-all text-clip opacity-50 font-gordita font-semibold bg-gradient-to-b from-gray-900 to-gray-600 bg-clip-text capitalize"
          style={{
            fontSize: `${fontSize}px`,
          }}
        >
          {user?.profile.login}
        </p>
      </div>
    </div>
  );
};
