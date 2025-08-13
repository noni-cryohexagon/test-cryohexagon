import { useState } from "react";
import { cn } from "@/lib/utils";
import DialogText from "../common/DialogText";
import { Steps } from "../CaseProcessDialog";
import StepWrapper from "../common/StepWrapper";
import RowWrapper from "../common/RowWrapper";
import SampleCountBadge from "../common/SampleCountBadge";
import ArrayDisplay from "../common/ArrayDisplay";

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

const canes = [
  {
    straws: [
      { id: "1", sampleIds: ["1", "2"] },
      { id: "2", sampleIds: ["3", "4"] },
    ],
  },
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
      {canes.map((cane) => (
        <RowWrapper key={cane.id}>
          <div className="flex items-center">
            <div className="mr-3">
              <SampleCountBadge amount={cane.straws.length} type="embryos" text={`Straws`} onClick={undefined} />
            </div>

            <div className="mr-3">
              <SampleCountBadge
                isRounded
                amount={cane.straws.reduce((acc, s) => acc + s.sampleIds.length, 0)}
                type="embryos"
                text={`embryos DAY 3`}
                onClick={undefined}
              />
            </div>

            <div className="flex-1 text-sm mr-3">
              Cane <span className="font-medium text-[var(--primary)]">NEW</span>
            </div>
            <div className="w-6 border-b " />
            <ArrayDisplay
              cellProps={[
                { label: "Room", value: "1", isDarkBG: false },
                { label: "Tank", value: "2", isDarkBG: false },
                { label: "Cell", value: "20 B", isDarkBG: false },
                { label: "Tag", value: "12", isDarkBG: true },
              ]}
            />
          </div>
        </RowWrapper>
      ))}
    </StepWrapper>
  );
}
