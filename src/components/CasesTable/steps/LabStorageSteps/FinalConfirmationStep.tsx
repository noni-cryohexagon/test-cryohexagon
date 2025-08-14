import { useState } from "react";
import { cn } from "@/lib/utils";
import { Steps } from "../../CaseProcessDialog";
import StepWrapper from "../../common/StepWrapper";

import CaneDisplay from "../../common/CaneDisplay";

import SpotGoldSvg from "../../common/SpotGoldSvg";

export default function FinalConfirmationStep({ currentState, currentStep }: { currentStep: Steps }) {
  return (
    <StepWrapper isShow={currentStep === "finalConfirmationStep"}>
      <div className="relative">
        {currentState.newCanes.map((cane) => (
          <div className="pt-40 ml-40 transform-[scale(1.3)]">
            <CaneDisplay cane={cane} />
          </div>
        ))}

        <div className="absolute -top-40 left-0 right-0 bottom-0">
          <SpotGoldSvg />
        </div>
      </div>
    </StepWrapper>
  );
}
