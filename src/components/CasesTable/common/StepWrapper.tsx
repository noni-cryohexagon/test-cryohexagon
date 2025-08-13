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
      }, 300);
    } else {
      setIsTransitioning(true);
      setTimeout(() => {
        setIsDisplayingStep(false);
        setIsTransitioning(false);
      }, 300);
    }
  }, [isShow]);

  return (
    <div
      className={cn(
        `text-lg font-light opacity-0 transition-opacity duration-300`,
        !isShow && "hidden absolute z-10 opacity-0 transition-opacity duration-300",
        !isShow && !isTransitioning && "width-0",
        // isTransitioning && "absolute top-0 left-0 z-10 opacity-100 transition-opacity duration-300",
        isDisplayingStep && "block w-full  opacity-100 z-30",
        className,
      )}
    >
      {children}
    </div>
  );
}
