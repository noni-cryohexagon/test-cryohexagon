import { useState } from "react";
import { cn } from "@/lib/utils";
import { Steps } from "../../CaseProcessDialog";
import StepWrapper from "../../common/StepWrapper";

import CaneDisplay from "../../common/CaneDisplay";

import { Cane } from "../../CaseProcessDialog";

import PrinterSuccessSvg from "../../common/PrinterSuccessSvg";

const canes: Cane[] = [
  {
    id: "001",
    straws: [
      { id: "1", sampleIds: ["1", "2"] },
      { id: "2", sampleIds: ["3", "4"] },
    ],
  },
];

export default function PrintLabelFinishedStep({ currentState, currentStep }: { currentStep: Steps }) {
  return (
    <StepWrapper isShow={currentStep === "printLabelFinishedStep"}>
      wefwefwef
      {canes.map((cane) => (
        <CaneDisplay cane={cane} />
      ))}
      <div className="my-6 border-b border-[#807E7E] my-4" />
      <div className="flex justify-center">
        <PrinterSuccessSvg />
      </div>
    </StepWrapper>
  );
}
