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
import { useState } from "react";

export default function CaseStatusStep({
  caseData,
  currentState,
  currentStep,
  setNextStep,
}: {
  caseData: Patient;
  currentStep: Steps;
  setNextStep: (step: Steps) => void;
}) {
  const [isLineOpen, setIsLineOpen] = useState(false);
  const type = caseData.embryos > 0 ? "embryos" : "oocytes";
  const count = caseData.embryos > 0 ? caseData.embryos : caseData.oocytes;

  const canOrganize = currentState.samples.length > 0;
  const canPrepare = currentState.newStraws.length > 0;

  return (
    <StepWrapper isShow={currentStep === "caseStatus"}>
      <VerticalTimeIndicator className="w-30 " height={100} minutes={30} />
      <div className="ml-4">
        <section className="space-y-3">
          <DialogText>Prepare for storage:</DialogText>

          <div className="group">
            <LineWrapper>
              <div
                className="flex items-center justify-between"
                onClick={() => canPrepare && setIsLineOpen(!isLineOpen)}
              >
                {canOrganize && (
                  <div className="flex items-center gap-3 text-sm">
                    <Badge type={type} number={count} text={type.charAt(0).toUpperCase() + type.slice(1)} />
                    <span className="text-muted-foreground">to assign</span>
                  </div>
                )}
                {canPrepare && currentState.newStraws && <CaneDisplay cane={{ straws: currentState.newStraws }} />}
                {canPrepare && isLineOpen && (
                  <div>
                    {currentState.newStraws.map((straw) => (
                      <StrawDisplay straw={straw} className="mb-2" hideClose />
                    ))}
                  </div>
                )}
                <div className=" opacity-0 group-hover:opacity-100">
                  {canOrganize && (
                    <CtaButton onClick={() => setNextStep("organizeSamples")}>Organize samples</CtaButton>
                  )}
                  {canPrepare && (
                    <CtaButton onClick={() => setNextStep("organizeSamplesInStrawsStep")}>Prepare</CtaButton>
                  )}
                </div>
              </div>
            </LineWrapper>
          </div>
        </section>

        <section className="mt-6 space-y-3">
          <DialogText>Stored:</DialogText>
          <LineWrapper>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <Badge type={type} number={3} text="Straws" isRounded={false} />
              <Badge type={type} number={8} text="Embryos" />
              <span className="text-muted-foreground">Cane 9393103</span>
            </div>
          </LineWrapper>
        </section>

        {/* <div className="mt-8">{newCaseData && <CaseEditor caseId={newCaseData.id} />}</div> */}
      </div>
    </StepWrapper>
  );
}
