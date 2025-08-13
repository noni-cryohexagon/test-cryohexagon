import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogOverlay,
} from "../ui/dialog";
import CaseEditor from "./CaseEditor";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { ChevronRight, X } from "lucide-react";

import { useCase } from "@/db/cases/hooks";
import { Avatar } from "@radix-ui/react-avatar";
import SpotSvg from "./common/SpotSvg";

import CaseStatusStep from "./steps/CaseStatusStep";
import OrganizeSamplesStep from "./steps/OrganizeSamplesStep";
import { useState } from "react";
import PrimaryButton from "./common/PrimaryButton";
import AllocateCanesStep from "./steps/AllocateCanesStep";
import { cn } from "@/lib/utils";
import DialogText from "./common/DialogText";

const patientDataMap = {
  name: "Name",
  hackId: "ID",
  case_no: "Case No.",
  cpu_sc: "OPU",
  partner: "Partner",
  timer: "Timer",
  serology: "Serology",
};

export type Steps = "caseStatus" | "organizeSamples" | "allocateCanesStep";

const stepsMap = {
  caseStatus: {
    nextStep: "organizeSamples",
    isShowFooter: false,
  },
  organizeSamples: {
    nextStep: "allocateCanesStep",
    isShowFooter: true,
  },
  allocateCanesStep: {
    nextStep: null,
    isShowFooter: true,
  },
};
interface IProps {
  caseId: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function CaseProcessDialog({ caseId, isOpen, setIsOpen }: IProps) {
  const { data: caseData, isLoading } = useCase(caseId);
  const [currentStep, setCurrentStep] = useState<Steps>("caseStatus");

  const gotToAssignSamples = () => {
    setCurrentStep("organizeSamples");
  };

  const newCaseData = { ...caseData, serology: "Negative" };

  const handleNext = () => {
    setCurrentStep(stepsMap[currentStep].nextStep || "caseStatus");
  };

  const stepConf = stepsMap[currentStep];

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          return;
        }
        setIsOpen(open);
      }}
    >
      <DialogOverlay style={{ backgroundColor: "var(--background)" }} />
      {/* <DialogOverlay className="bg-black/500" style={{ backgroundColor: "var(--background)" }} /> */}
      <VisuallyHidden>
        <DialogTitle>Case Details</DialogTitle>
      </VisuallyHidden>
      <DialogContent
        // Make this the positioning context for floating bits
        className="w-[1440px] min-w-[1370px] max-w-[95vw]  min-h-[650px] max-h-[650px] p-0 bg-white rounded-2xl border-0"
      >
        <span className="absolute -top-13.5 left-0 flex z-2 text-xl font-light ">
          Insertions <ChevronRight className="mt-0.5 mx-3 size-6" /> Case {caseData?.case_no}
        </span>

        <DialogClose asChild onClick={() => setIsOpen(false)}>
          <button
            type="button"
            aria-label="Close"
            className="absolute -top-15 -right-0 z-20 inline-flex size-9 items-center justify-center rounded-full border bg-background shadow-lg hover:opacity-90 focus:outline-none focus-visible:ring"
            style={{ backgroundColor: "#E9E9E2", border: "none" }}
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </DialogClose>

        {/* Sticky header like your purple card */}
        <div className="relative h-[116px] sticky top-0 z-10 bg-[var(--primary)] text-white overflow-hidden rounded-t-2xl">
          <div className="absolute -top-0 -left-0 -z-1">
            <SpotSvg />
          </div>
          <div className="px-10.5 pt-0.5 pb-0">
            <DialogHeader className="overflow-hidden ">
              <div className="mt-4 flex flex-row text-sm ">
                <Avatar
                  className="mr-3 overflow-hidden rounded-full"
                  style={{ minHeight: 50, minWidth: 50, maxHeight: 50, maxWidth: 50 }}
                >
                  <img src={`/mock/${newCaseData?.avatar}`} alt={newCaseData?.name} />
                </Avatar>
                {newCaseData && (
                  <div className="pt-1 flex flex-row">
                    {["name", "hackId", "cpu_sc", "partner", "serology"].map((field) => (
                      <Info className="mr-22" key={field} label={field} value={newCaseData[field]} />
                    ))}
                  </div>
                )}
                <div className="mt-1">
                  <div className="flex items-center">
                    <div className="w-25 text-xs text-indigo-200">Oocyte source</div>
                    <div className="">Patient</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-25 text-xs text-indigo-200">Sperm source</div>
                    <div className="">Partner</div>
                  </div>
                </div>
              </div>
            </DialogHeader>
          </div>
        </div>

        {/* <ScrollArea className=" overflow-hidden"> */}
        <div className="relative min-h-[494px] flex w-full px-25 pt-4 overflow-hidden">
          <div className="relative w-full">
            <CaseStatusStep onNext={handleNext} currentStep={currentStep} />
            <OrganizeSamplesStep onNext={handleNext} currentStep={currentStep} />
            <AllocateCanesStep onNext={handleNext} currentStep={currentStep} />
          </div>
        </div>
        {/* </ScrollArea> */}
        <Footer
          stepNum={1}
          totalSteps={2}
          title="Organize samples in straws."
          description="You can drag & drop samples between straws."
          className={cn(
            "mt-4 opacity-0 transition-opacity duration-800",
            stepConf.isShowFooter && "opacity-100",
            !stepConf.isShowFooter && "pointer-events-none",
          )}
        >
          <PrimaryButton onClick={handleNext}>Next</PrimaryButton>
        </Footer>
      </DialogContent>
    </Dialog>
  );
}

function Info({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={`capitalize ${className}`}>
      <div className="text-sm font-light text-indigo-200">{patientDataMap[label]}</div>
      <div className="mt-0.5 font-light text-sm">{value}</div>
    </div>
  );
}

function Footer({
  stepNum,
  totalSteps,
  title,
  description,
  children,
  className,
}: {
  stepNum: number;
  totalSteps: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white px-14 py-8 flex items-center justify-between rounded-2xl ${className}`}>
      <div className="flex items-center">
        <DialogText className="mr-4 text-2xl font-light text-indigo-200">
          <span className="text-black">{stepNum}</span>/{totalSteps}
        </DialogText>
        <DialogText className="text-sm font-light ">{title}</DialogText>
        <DialogText className="ml-5 font-light text-sm text-[#807E7E]">{description}</DialogText>
      </div>
      <div className="flex items-center">{children}</div>
    </div>
  );
}
