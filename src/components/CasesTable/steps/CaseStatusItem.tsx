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

export default function CaseStatusItem({
  caseData,
  currentState,
  currentStep,
  setNextStep,
  isHovered,
}: {
  caseData: Patient;
  currentStep: Steps;
  setNextStep: (step: Steps) => void;
  isHovered: boolean;
}) {
  const [isLineOpen, setIsLineOpen] = useState(false);

  const type = caseData.embryos > 0 ? "embryos" : "oocytes";
  const count = caseData.embryos > 0 ? caseData.embryos : caseData.oocytes;

  const canOrganize = currentState.samples.length > 0;
  const canPrepare = currentState.newStraws.length > 0;

  const goToStep = (step: Steps) => {
    setNextStep(step);
    setTimeout(() => {
      setIsLineOpen(false);
    }, 300);
  };

  return (
    <div className={cn("flex items-center justify-between")} onClick={() => canPrepare && setIsLineOpen(!isLineOpen)}>
      {canOrganize && (
        <div className="flex items-center gap-3 text-sm">
          <Badge type={type} number={count} text={type.charAt(0).toUpperCase() + type.slice(1)} />
          <span className="text-muted-foreground">to assign</span>
        </div>
      )}
      <div>
        {canPrepare && currentState.newStraws && <CaneDisplay cane={{ straws: currentState.newStraws }} />}
        {canPrepare && isLineOpen && (
          <div className="mt-6">
            {currentState.newStraws.map((straw) => (
              <StrawDisplay straw={straw} className="mb-2 ml-5" hideClose />
            ))}
          </div>
        )}
      </div>
      <div className={cn("self-start opacity-0 ", isHovered && "opacity-100")}>
        {canOrganize && <CtaButton onClick={() => goToStep("organizeSamples")}>Organize samples</CtaButton>}
        {canPrepare && <CtaButton onClick={() => goToStep("organizeSamplesInStrawsStep")}>Prepare</CtaButton>}
      </div>
    </div>
  );
}
