import * as React from "react";
import {
  useRive,
  Alignment,
  Layout,
  Fit,
  useStateMachineInput,
} from "@rive-app/react-canvas";
import { cn } from "@/lib/utils";
export const FrogAnimation = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const { rive, RiveComponent } = useRive({
    src: "https://alendra1945.github.io/github-repo-search/frog.riv",
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
  // const numX = useStateMachineInput(rive, "State Machine 1", "numX");
  // const numY = useStateMachineInput(rive, "State Machine 1", "numY");
  // const handlePointerMove = (event: MouseEvent<HTMLDivElement, MouseEvent>) => {
  // const rect = event.target.getBoundingClientRect();
  // const centerX = rect.width / 2;
  // const centerY = rect.height / 2;
  // requestAnimationFrame(() => {
  //   if (numX && numY) {
  //     numX.value = Math.max(0, Math.min(event.clientX, 100));
  //     numY.value = Math.max(0, Math.min(centerY - event.clientY, 100));
  //   }
  // });
  // };
  const handleClick = () => {
    console.log(bumpInput);
    bumpInput?.fire();
  };

  // Wait until the rive object is instantiated before adding the Rive
  // event listener
  // const [show, setShow] = useState(false);
  return (
    <div
      className={cn(
        "h-full w-full absolute left-0 right-0 bg-gradient-to-bl from-teal-400 to-yellow-200",
        className
      )}
      {...props}
      // onMouseMove={handlePointerMove}
    >
      <RiveComponent
        onClick={handleClick}
        className="w-full h-full relative -translate-x-1/3"
      />
    </div>
  );
};
