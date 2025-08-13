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
        <div className="flex-1 flex flex-row items-center justify-between border-b border-[##D9D9D9] pb-4">
          <div className="flex-1 flex flex-row  ">
            {remainingSamples.map((sample) => (
              <div className="mr-3" key={sample.id}>
                <SampleStatusBadge
                  isSelected={selectedSamples.includes(sample.id)}
                  id={sample.id}
                  type={sample.type}
                  stage={sample.stage}
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
        </div>
      )}

      <DialogText className="mt-10 mb-2">Straws</DialogText>
      {straws.map((straw) => (
        <div className="mb-4 flex-1 flex flex-row items-center  border-b border-[##D9D9D9] pb-4" key={straw.id}>
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
        </div>
      ))}
    </StepWrapper>
  );
}

function SampleStatusBadge({
  isSelected,
  id,
  stage,
  type,
  isShowClose = false,
  onClick,
}: {
  isSelected: boolean;
  id: string;
  stage: string;
  type: string;
  isShowClose?: boolean;
  onClick: () => void;
}) {
  const colorMap = {
    embryos: {
      textColor: "#241F1C",
      borderColor: "#FFD46E",
      backgroundColor: "#FFD46E",
      indicatorBackgroundColor: "#FFE3A1",
    },
  };

  const colors = colorMap[type] || colorMap["embryos"];

  return (
    <span
      style={{
        backgroundColor: `${isSelected ? colors.indicatorBackgroundColor : "transparent"}`,
        borderColor: colors.borderColor,
      }}
      className={cn(
        "min-h-[32px] inline-flex select-none items-center gap-1 border bg-background  text-xs font-medium shadow-sm",
        "rounded-full cursor-pointer",
      )}
      onClick={onClick}
    >
      {isSelected && (
        <span
          style={{ color: colors.textColor, backgroundColor: colors.backgroundColor }}
          className={cn(
            "opacity-0 ml-1 min-h-[24px] min-w-[24px] flex items-center justify-center rounded-full",
            isSelected && "opacity-100",
          )}
        >
          {isSelected ? <VSvg /> : null}
        </span>
      )}
      <span className={cn("ml-2 mr-3 flex items-center justify-center rounded-full")}>
        <span className="text-xs font-medium mr-1">#{id}</span>
        {stage}
        <span className="text-xs font-medium ml-1">{type}</span>
      </span>
      {isShowClose && (
        <span className="mx-2 cursor-pointer" onClick={() => onClick(id)}>
          <X className="h-4 w-4 text-gray-400" />
        </span>
      )}
    </span>
  );
}
