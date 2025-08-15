import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import DialogText from "../common/DialogText";
import { Steps } from "../CaseProcessDialog";
import StepWrapper from "../common/StepWrapper";
import PrimaryButton from "../common/PrimaryButton";
import RowWrapper from "../common/RowWrapper";
import SampleStatusBadge from "../common/SampleStatusBadge";
import StrawDisplay from "../common/StrawDisplay";
import { useFooter } from "../abcd";

export default function OrganizeSamplesStep({
  currentStep,
  currentState,
  setCurrentState,
}: {
  currentStep: Steps;
  currentState: any;
  setCurrentState: (state: any) => void;
}) {
  const [selectedSamples, setSelectedSamples] = useState<string[]>([]);
  const { setFooter } = useFooter();

  const toggleSelection = (id: string) => {
    if (selectedSamples.includes(id)) {
      setSelectedSamples(selectedSamples.filter((sampleId) => sampleId !== id));
    } else {
      setSelectedSamples([...selectedSamples, id]);
    }
  };

  const createNewStraw = () => {
    setSelectedSamples([]);
    setCurrentState((prevState) => ({
      ...prevState,
      samples: prevState.samples.filter((sample) => !selectedSamples.includes(sample.id)),
      newStraws: [
        ...prevState.newStraws,
        {
          id: prevState.newStraws.length + 1,
          samples: prevState.samples.filter((sample) => selectedSamples.includes(sample.id)),
          isApproved: false,
        },
      ],
    }));
    setFooter((prev) => ({
      ...prev,
      title: "Organize samples in straws.",
      description: "You can drag & drop samples between straws.",
    }));
  };

  const remainingSamples = currentState.samples.filter(
    (sample) => !currentState.newStraws.reduce((acc, straw) => acc.concat(straw.samples), []).includes(sample.id),
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
      {currentState.newStraws.map((straw) => (
        <RowWrapper key={straw.id}>
          <StrawDisplay straw={straw} />
        </RowWrapper>
      ))}
    </StepWrapper>
  );
}
