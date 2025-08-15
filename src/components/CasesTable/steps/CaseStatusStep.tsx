import { cn } from "@/lib/utils";
import Badge from "../common/Badge";
import DialogText from "../common/DialogText";
import LineWrapper from "../common/LineWrapper";
import CtaButton from "../common/CtaButton";
import { Steps } from "../CaseProcessDialog";
import StepWrapper from "../common/StepWrapper";
import { Patient } from "../CasesTable";
import VerticalTimeIndicator from "../common/VerticalTimeIndicator";
import CaneDisplay from "../common/CaneDisplay";
import StrawDisplay from "../common/StrawDisplay";
import { useEffect, useState } from "react";
import PrimaryButton from "../common/PrimaryButton";
import CaseStatusItem from "./CaseStatusItem";

export default function CaseStatusStep({
  caseData,
  currentState,
  currentStep,
  setNextStep,
}: {
  caseData: Patient;
  currentState: any;
  currentStep: Steps;
  setNextStep: (step: Steps) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);

  const type = caseData.embryos > 0 ? "embryos" : "oocytes";
  const count = caseData.embryos > 0 ? caseData.embryos : caseData.oocytes;

  const canOrganize = currentState.samples.length > 0;
  const canPrepare = currentState.newStraws.length > 0;

  useEffect(() => {
    if (currentState.isDone) {
      setIsAnimationStarted(true);
    }
  }, [currentState]);

  return (
    <StepWrapper isShow={currentStep === "caseStatus"}>
      <VerticalTimeIndicator className="w-30 " height={100} minutes={30} />
      <div className="ml-4">
        {/* Initial "Prepare for storage" section - fades out after animation starts */}
        <section
          className={cn("space-y-3 transition-opacity duration-800", isAnimationStarted && "delay-1800 opacity-0")}
        >
          <div>
            <DialogText>Prepare for storage:</DialogText>
          </div>

          <div
            className={cn("relative", canPrepare && "cursor-pointer")}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Item that moves down - disappears after moving */}
            <div
              style={{
                transition: isAnimationStarted
                  ? "transform 800ms 1000ms ease-in-out, opacity 400ms 1800ms ease-in-out"
                  : "transform 800ms ease-in-out, opacity 400ms ease-in-out",
                transform: isAnimationStarted ? "translateY(130px)" : "translateY(0px)",
                opacity: isAnimationStarted ? 0 : 1,
              }}
            >
              <LineWrapper hasHoverEffect>
                <CaseStatusItem
                  caseData={caseData}
                  currentState={currentState}
                  currentStep={currentStep}
                  setNextStep={setNextStep}
                  isHovered={isHovered}
                />
              </LineWrapper>
            </div>
          </div>
        </section>

        {/* "Ready for storage" section - appears and moves up */}
        <section
          className={cn(
            "space-y-3 relative mt-6 transition-all duration-800",
            isAnimationStarted && "delay-1000 -translate-y-[74px]",
            isAnimationStarted && "delay-2600 -translate-y-[126px]",
          )}
        >
          <DialogText className="mb-4">Ready for storage:</DialogText>

          {/* New item appears in ready section */}
          <LineWrapper
            className={cn("opacity-0 transition-opacity duration-800", isAnimationStarted && "delay-1800 opacity-100")}
          >
            <CaseStatusItem
              caseData={caseData}
              currentState={currentState}
              currentStep={currentStep}
              setNextStep={setNextStep}
              isHovered={false}
            />
          </LineWrapper>
        </section>

        {/* "Stored" section - moves up with animation */}
        <section
          className={cn(
            "mt-6 space-y-3 transition-all duration-800",
            isAnimationStarted && "delay-1000 -translate-y-[48px]",
            isAnimationStarted && "delay-2600 -translate-y-[100px]",
          )}
        >
          <DialogText>Stored:</DialogText>
          <LineWrapper>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <Badge type={type} number={3} text="Straws" isRounded={false} />
              <Badge type={type} number={8} text="Embryos" />
              <span className="text-muted-foreground">Cane 9393103</span>
            </div>
          </LineWrapper>
        </section>
      </div>
    </StepWrapper>
  );
}
