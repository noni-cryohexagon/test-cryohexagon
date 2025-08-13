import { useState } from "react";
import { cn } from "@/lib/utils";
import Badge from "../common/Badge";
import DialogText from "../common/DialogText";
import LineWrapper from "../common/LineWrapper";
import CtaButton from "../common/CtaButton";
import VerticalTimeIndicator from "../common/VerticalTimeIndicator";
import { Steps } from "../CaseProcessDialog";
import StepWrapper from "../common/StepWrapper";
import VSvg from "../common/VSvg";
import PrimaryButton from "../common/PrimaryButton";
import { X } from "lucide-react";

type Straw = {
  id: string;
  sampleIds: string[];
};

const samples = [
  { id: "1", stage: "8I-II", type: "Euploid" },
  { id: "2", stage: "8I-II", type: "Euploid" },
  { id: "3", stage: "8I-II", type: "Euploid" },
  { id: "4", stage: "8I-II", type: "Euploid" },
];

export default function AllocateCanesStep({ currentStep, onNext }: { currentStep: Steps; onNext: () => void }) {
  const [selectedSamples, setSelectedSamples] = useState<string[]>([]);
  const [straws, setStraws] = useState<Straw[]>([]);

  const toggleSelection = (id: string) => {
    if (selectedSamples.includes(id)) {
      setSelectedSamples(selectedSamples.filter((sampleId) => sampleId !== id));
    } else {
      setSelectedSamples([...selectedSamples, id]);
    }
  };

  const createNewStraw = () => {
    setStraws([...straws, { id: straws.length + 1, sampleIds: selectedSamples }]);
    setSelectedSamples([]);
  };

  const remainingSamples = samples.filter(
    (sample) => !straws.reduce((acc, straw) => acc.concat(straw.sampleIds), []).includes(sample.id),
  );

  return (
    <StepWrapper isShow={currentStep === "allocateCanesStep"}>
      <DialogText className="mb-2">Allocated canes:</DialogText>
    </StepWrapper>
  );
}
