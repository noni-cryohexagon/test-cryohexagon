import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function StepWrapper({
  isShow,
  className,
  children,
}: {
  isShow: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDisplayingStep, setIsDisplayingStep] = useState(false);

  useEffect(() => {
    if (isShow) {
      setIsTransitioning(true);
      setTimeout(() => {
        setIsDisplayingStep(true);
        setIsTransitioning(false);
      }, 200);
    } else {
      setIsTransitioning(true);
      setTimeout(() => {
        setIsDisplayingStep(false);
        setIsTransitioning(false);
      }, 200);
    }
  }, [isShow]);

  return (
    <div
      className={cn(
        `absolute text-lg font-light opacity-0 transition-opacity duration-800`,
        !isShow && "z-10 opacity-0 transition-opacity duration-800",
        !isShow && !isTransitioning && "width-0 height-0 hidden",
        // isTransitioning && "absolute top-0 left-0 z-10 opacity-100 transition-opacity duration-800",
        isDisplayingStep && "block w-full  opacity-100 z-30 transition-opacity duration-800",
        className,
      )}
    >
      {children}
    </div>
  );
}
