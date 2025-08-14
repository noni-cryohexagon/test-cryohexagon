import { useState } from "react";
import { cn } from "@/lib/utils";
import DialogText from "../common/DialogText";
import { Steps } from "../CaseProcessDialog";
import StepWrapper from "../common/StepWrapper";
import RowWrapper from "../common/RowWrapper";
import CaneDisplay from "../common/CaneDisplay";

const canes = [
  {
    straws: [
      { id: "1", sampleIds: ["1", "2"] },
      { id: "2", sampleIds: ["3", "4"] },
    ],
  },
];

export default function AllocateCanesStep({ currentStep }: { currentStep: Steps }) {
  return (
    <StepWrapper isShow={currentStep === "allocateCanesStep"}>
      <DialogText className="mb-2">Allocated canes:</DialogText>
      {canes.map((cane) => (
        <RowWrapper key={cane.id}>
          <CaneDisplay cane={cane} />
        </RowWrapper>
      ))}
    </StepWrapper>
  );
}
