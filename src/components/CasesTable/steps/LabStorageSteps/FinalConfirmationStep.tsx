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
import SpotGoldSvg from "../../common/SpotGoldSvg";

const canes: Cane[] = [
  {
    id: "001",
    straws: [
      { id: "1", sampleIds: ["1", "2"] },
      { id: "2", sampleIds: ["3", "4"] },
    ],
  },
];

export default function FinalConfirmationStep({ currentState, currentStep }: { currentStep: Steps }) {
  return (
    <StepWrapper isShow={currentStep === "finalConfirmationStep"}>
      <div className="relative">
        {canes.map((cane) => (
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
