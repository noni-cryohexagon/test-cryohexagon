import { useState } from "react";
import { cn } from "@/lib/utils";
import { Steps } from "../../CaseProcessDialog";
import StepWrapper from "../../common/StepWrapper";

import CaneDisplay from "../../common/CaneDisplay";

import TagSelector from "../../common/TagSelector";
import { useFooter } from "../../abcd";
import PrimaryButton from "../../common/PrimaryButton";

const tagOptions = [
  { id: "1", color: "#6CD671", value: "Red" },
  { id: "2", color: "#EC6233", value: "Green" },
  { id: "3", color: "#F7B8BA", value: "Blue" },
  { id: "4", color: "#EEEEEE", value: "Blue" },
  { id: "5", color: "#447BB2", value: "Blue" },
  { id: "6", color: "#E3B73F", value: "Blue" },
];

export default function SelectTagStep({ currentState, currentStep }: { currentStep: Steps }) {
  const { setFooter } = useFooter();

  const onSelectTag = (tag: { id: string; color: string; value: string }) => {
    setFooter((prev) => ({ ...prev, title: "Write the tag number." }));
  };

  return (
    <StepWrapper isShow={currentStep === "selectTagStep"}>
      {currentState.newCanes.map((cane) => (
        <CaneDisplay cane={cane} />
      ))}

      <div className="my-6 border-b border-[#807E7E] my-4" />

      <div className="flex justify-center flex-reverse">
        <TagSelector options={tagOptions} onChange={onSelectTag} />
      </div>
    </StepWrapper>
  );
}
