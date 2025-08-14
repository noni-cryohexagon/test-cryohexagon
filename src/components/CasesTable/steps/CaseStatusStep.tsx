import { cn } from "@/lib/utils";
import Badge from "../common/Badge";
import DialogText from "../common/DialogText";
import LineWrapper from "../common/LineWrapper";
import CtaButton from "../common/CtaButton";
import { Steps } from "../CaseProcessDialog";
import StepWrapper from "../common/StepWrapper";
import { Patient } from "../CasesTable";

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
  const type = caseData.embryos > 0 ? "embryos" : "oocytes";
  const count = caseData.embryos > 0 ? caseData.embryos : caseData.oocytes;

  const canOrganize = currentState.newStraws.length === 0;
  const canPrepare = currentState.newStraws.length > 0;

  return (
    <StepWrapper isShow={currentStep === "caseStatus"}>
      {/* <VerticalTimeIndicator className="w-30 " height={100} hours={1} minutes={50} /> */}
      <div className="ml-4">
        <section className="space-y-3">
          <DialogText>Prepare for storage:</DialogText>

          <LineWrapper>
            <div className="group flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm">
                <Badge type={type} number={count} text={type.charAt(0).toUpperCase() + type.slice(1)} />
                <span className="text-muted-foreground">to assign</span>
              </div>
              <div className=" opacity-0 group-hover:opacity-100">
                {canOrganize && <CtaButton onClick={() => setNextStep("organizeSamples")}>Organize samples</CtaButton>}
                {canPrepare && (
                  <CtaButton onClick={() => setNextStep("organizeSamplesInStrawsStep")}>Prepare</CtaButton>
                )}
              </div>
            </div>
          </LineWrapper>
        </section>

        <section className="mt-6 space-y-3">
          <DialogText>Stored:</DialogText>
          <LineWrapper>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <Badge type={type} number={3} text="Oocytes" />
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
