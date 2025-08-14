import { useState } from "react";
import { cn } from "@/lib/utils";
import { Steps } from "../../CaseProcessDialog";
import StepWrapper from "../../common/StepWrapper";
import RowWrapper from "../../common/RowWrapper";

import CaneDisplay from "../../common/CaneDisplay";

import StrawDisplay from "../../common/StrawDisplay";
import { Checkbox } from "@/components/ui/checkbox";

export default function OrganizeSamplesInStrawsStep({
  currentState,
  setCurrentState,
  currentStep,
}: {
  currentStep: Steps;
}) {
  return (
    <StepWrapper isShow={currentStep === "organizeSamplesInStrawsStep"}>
      {currentState.newCanes.map((cane) => (
        <CaneDisplay cane={cane} />
      ))}

      <div className="my-6 border-b border-[#807E7E] my-4" />

      {currentState.newStraws.map((straw) => (
        <RowWrapper key={straw.id}>
          <div className="w-full flex items-center justify-between">
            <StrawDisplay straw={straw} hideClose />

            <Checkbox
              className="ml-4 border-black"
              checked={straw.isSelected}
              onCheckedChange={(checked) => {
                setCurrentState((prevState) => ({
                  ...prevState,
                  newStraws: prevState.newStraws.map((s) => (s.id === straw.id ? { ...s, isApproved: checked } : s)),
                }));
              }}
            />
          </div>
        </RowWrapper>
      ))}
    </StepWrapper>
  );
}
