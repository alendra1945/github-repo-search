"use client";
import { useEffect, useRef, useState } from "react";
import { copy } from "@/lib/copy-to-clipboard";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ICopyBtnProps = {
  value: string;
  className?: string;
  isPlain?: boolean;
};

export const CopyBtn = ({ value, className, isPlain }: ICopyBtnProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const refTimeout = timeout.current;
    return () => {
      if (refTimeout) {
        clearTimeout(refTimeout);
      }
    };
  });
  const handleCopy = () => {
    copy(value);
    setIsCopied(true);
    timeout.current = setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  return (
    <Tooltip delayDuration={2}>
      <TooltipTrigger
        asChild
        style={
          !isPlain
            ? {
                boxShadow:
                  "0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)",
              }
            : {}
        }
        onClick={(e) => {
          e.stopPropagation();
          handleCopy();
        }}
      >
        <Button
          variant="ghost"
          size="icon"
          className={cn("box-border p-0.5 flex cursor-pointer", className)}
        >
          {!isCopied ? <CopyIcon /> : <CheckIcon />}
        </Button>
      </TooltipTrigger>
      <TooltipContent
        side="right"
        className="bg-[#167364] [&_svg]:fill-[#167364] [&_svg]:bg-[#167364]"
      >
        Copy
      </TooltipContent>
    </Tooltip>
  );
};
