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
import TagSelector from "../../common/TagSelector";

const canes: Cane[] = [
  {
    id: "001",
    straws: [
      { id: "1", sampleIds: ["1", "2"] },
      { id: "2", sampleIds: ["3", "4"] },
    ],
  },
];

const tagOptions = [
  { id: "1", color: "#6CD671", value: "Red" },
  { id: "2", color: "#EC6233", value: "Green" },
  { id: "3", color: "#F7B8BA", value: "Blue" },
  { id: "4", color: "#EEEEEE", value: "Blue" },
  { id: "5", color: "#447BB2", value: "Blue" },
  { id: "6", color: "#E3B73F", value: "Blue" },
];

export default function SelectTagStep({ currentState, currentStep }: { currentStep: Steps }) {
  return (
    <StepWrapper isShow={currentStep === "selectTagStep"}>
      {canes.map((cane) => (
        <CaneDisplay cane={cane} />
      ))}

      <div className="my-6 border-b border-[#807E7E] my-4" />

      <div className="flex justify-center flex-reverse">
        <TagSelector options={tagOptions} />
      </div>
    </StepWrapper>
  );
}
