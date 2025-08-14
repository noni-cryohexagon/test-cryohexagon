import { useState } from "react";
import { cn } from "@/lib/utils";
import { Steps } from "../../CaseProcessDialog";
import StepWrapper from "../../common/StepWrapper";

import CaneDisplay from "../../common/CaneDisplay";

import PrinterSuccessSvg from "../../common/PrinterSuccessSvg";

export default function PrintLabelFinishedStep({ currentState, currentStep }: { currentStep: Steps }) {
  return (
    <StepWrapper isShow={currentStep === "printLabelFinishedStep"}>
      {currentState.newCanes.map((cane) => (
        <CaneDisplay cane={cane} />
      ))}
      <div className="my-6 border-b border-[#807E7E] my-4" />
      <div className="flex justify-center">
        <PrinterSuccessSvg />
      </div>
    </StepWrapper>
  );
}
