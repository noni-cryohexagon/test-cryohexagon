import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import DialogText from "../common/DialogText";
import { Steps } from "../CaseProcessDialog";
import StepWrapper from "../common/StepWrapper";
import RowWrapper from "../common/RowWrapper";
import CaneDisplay from "../common/CaneDisplay";

export default function AllocateCanesStep({ currentState, setCurrentState, currentStep }: { currentStep: Steps }) {
  useEffect(() => {
    if (currentStep === "allocateCanesStep") {
      setCurrentState((prevState) => ({
        ...prevState,
        newCanes: [{ id: "007", straws: currentState.newStraws }],
      }));
    }
  }, [currentStep]);

  return (
    <StepWrapper isShow={currentStep === "allocateCanesStep"}>
      <DialogText className="mb-2">Allocated canes:</DialogText>
      {currentState.newCanes.map((cane) => (
        <RowWrapper key={cane.id}>
          <CaneDisplay cane={cane} />
        </RowWrapper>
      ))}
    </StepWrapper>
  );
}
