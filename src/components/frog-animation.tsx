import * as React from "react";
import {
  useRive,
  Alignment,
  Layout,
  Fit,
  useStateMachineInput,
} from "@rive-app/react-canvas";
import { cn } from "@/lib/utils";
export default function FrogAnimation({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { rive, RiveComponent, canvas } = useRive({
    src: "https://alendra1945.github.io/github-repo-search/frog.riv",
    artboard: "Frog Captcha",
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.TopCenter,
      layoutScaleFactor: 5,
    }),
  });
  const tongue = useStateMachineInput(rive, "State Machine 1", "Tongue");
  const numX = useStateMachineInput(rive, "State Machine 1", "numX");
  const numY = useStateMachineInput(rive, "State Machine 1", "numY");
  const handlePointerMove: React.MouseEventHandler = (event) => {
    if (!canvas) {
      return;
    }
    const rect = canvas.getBoundingClientRect();
    requestAnimationFrame(() => {
      if (numX && numY) {
        numX.value = Math.max(
          0,
          Math.min(event.clientX - rect.height / 4, 100)
        );
        numY.value = Math.max(
          0,
          Math.min(rect.height / 2 - event.clientY, 100)
        );
      }
    });
  };
  const handleClick = () => {
    tongue?.fire();
  };
  return (
    <div
      className={cn(
        "h-full w-full absolute top-0 left-0 right-0 bg-gradient-to-bl from-teal-400 to-yellow-200",
        className
      )}
      {...props}
      onMouseMove={handlePointerMove}
      onClick={handleClick}
    >
      <RiveComponent className="absolute left-0 w-[1000px] h-[800px] -translate-x-1/3" />
    </div>
  );
}
