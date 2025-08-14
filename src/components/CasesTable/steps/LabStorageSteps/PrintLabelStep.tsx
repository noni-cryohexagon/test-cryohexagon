import { useState } from "react";
import { cn } from "@/lib/utils";
import DialogText from "../../common/DialogText";
import { Steps } from "../../CaseProcessDialog";
import StepWrapper from "../../common/StepWrapper";
import RowWrapper from "../../common/RowWrapper";

import CaneDisplay from "../../common/CaneDisplay";

import { Cane } from "../../CaseProcessDialog";
import StrawDisplay from "../../common/StrawDisplay";
import { Checkbox } from "@/components/ui/checkbox";
import PrinterSvg from "../../common/PrinterSvg";

const canes: Cane[] = [
  {
    id: "001",
    straws: [
      { id: "1", sampleIds: ["1", "2"] },
      { id: "2", sampleIds: ["3", "4"] },
    ],
  },
];

export default function PrintLabelStep({ currentState, currentStep }: { currentStep: Steps }) {
  return (
    <StepWrapper isShow={currentStep === "printLabelStep"}>
      {canes.map((cane) => (
        <CaneDisplay cane={cane} />
      ))}

      <div className="my-6 border-b border-[#807E7E] my-4" />

      <div className="flex justify-center">
        <PrinterSvg />
      </div>
    </StepWrapper>
  );
}
