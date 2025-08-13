import { useState } from "react";
import { cn } from "@/lib/utils";
import DialogText from "../common/DialogText";
import { Steps } from "../CaseProcessDialog";
import StepWrapper from "../common/StepWrapper";
import PrimaryButton from "../common/PrimaryButton";
import RowWrapper from "../common/RowWrapper";
import SampleStatusBadge from "../common/SampleStatusBadge";

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

export default function OrganizeSamplesStep({ currentStep, onNext }: { currentStep: Steps; onNext: () => void }) {
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
    <StepWrapper isShow={currentStep === "organizeSamples"}>
      <DialogText className="mb-2">
        Embryos <span className="font-medium text-[var(--primary)]">DAY 3</span>:
      </DialogText>

      {remainingSamples.length > 0 && (
        <RowWrapper>
          <div className="flex-1 flex flex-row  ">
            {remainingSamples.map((sample) => (
              <div className="mr-3" key={sample.id}>
                <SampleStatusBadge
                  isSelected={selectedSamples.includes(sample.id)}
                  id={sample.id}
                  type={sample.type}
                  stage={sample.stage}
                  isRounded
                  onClick={() => toggleSelection(sample.id)}
                />
              </div>
            ))}
          </div>
          <PrimaryButton
            className={selectedSamples.length === 0 ? "opacity-0 pointer-events-none" : ""}
            onClick={createNewStraw}
          >
            New straw
          </PrimaryButton>
        </RowWrapper>
      )}

      <DialogText className="mt-10 mb-2">Straws</DialogText>
      {straws.map((straw) => (
        <RowWrapper key={straw.id}>
          <div className="mr-4 px-4 py-1 bg-[#FFD46E]  rounded-xs text-sm">Straw #{straw.id}</div>

          {straw.sampleIds.map((id) => {
            const sample = samples.find((s) => s.id === id);
            if (!sample) return null;
            return (
              <div className="mr-3" key={sample.id}>
                <SampleStatusBadge
                  id={sample.id}
                  stage={sample.stage}
                  type={sample.type}
                  isShowClose
                  isSelected={false}
                  onClick={() => {}}
                />
              </div>
            );
          })}
        </RowWrapper>
      ))}
    </StepWrapper>
  );
}
