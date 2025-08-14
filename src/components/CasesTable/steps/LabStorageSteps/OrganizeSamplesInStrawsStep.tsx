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

const canes: Cane[] = [
  {
    id: "001",
    straws: [
      { id: "1", sampleIds: ["1", "2"] },
      { id: "2", sampleIds: ["3", "4"] },
    ],
  },
];

export default function OrganizeSamplesInStrawsStep({ currentState, currentStep }: { currentStep: Steps }) {
  return (
    <StepWrapper isShow={currentStep === "organizeSamplesInStrawsStep"}>
      {canes.map((cane) => (
        <CaneDisplay cane={cane} />
      ))}

      <div className="my-6 border-b border-[#807E7E] my-4" />

      {currentState.newStraws.map((straw) => (
        <RowWrapper key={straw.id}>
          <div className="w-full flex items-center justify-between">
            <StrawDisplay straw={straw} />

            <Checkbox
              className="ml-4 border-black"
              checked={straw.isSelected}
              onCheckedChange={(checked) => {
                // Handle checkbox change
              }}
            />
          </div>
        </RowWrapper>
      ))}
    </StepWrapper>
  );
}
