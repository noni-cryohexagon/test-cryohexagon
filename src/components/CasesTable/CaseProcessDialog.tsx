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
import SpotSvg from "./SpotSvg";

import DialogText from "./common/DialogText";
import VerticalTimeIndicator from "./common/VerticalTimeIndicator";
import LineWrapper from "./common/LineWrapper";
import { cn } from "@/lib/utils";
import CtaButton from "./common/CtaButton";

const patientDataMap = {
  name: "Name",
  hackId: "ID",
  case_no: "Case No.",
  cpu_sc: "OPU",
  partner: "Partner",
  timer: "Timer",
  serology: "Serology",
};

interface IProps {
  caseId: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function CaseProcessDialog({ caseId, isOpen, setIsOpen }: IProps) {
  const { data: caseData, isLoading } = useCase(caseId);

  const gotToAssignSamples = () => {
    console.log("Going to assign samples");
  };

  const newCaseData = { ...caseData, serology: "Negative" };

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
      <DialogOverlay style={{ background: "var(--background)" }} />
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
            className="absolute -top-15 -right-3 z-20 inline-flex size-9 items-center justify-center rounded-full border bg-background shadow-lg hover:opacity-90 focus:outline-none focus-visible:ring"
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
        <div className="relative min-h-[494px] px-25 pt-4 overflow-hidden">
          <VerticalTimeIndicator className="w-30 " height={100} hours={1} minutes={50} />
          <div className="ml-4">
            <section className="space-y-3">
              <DialogText>Prepare for storage:</DialogText>

              <LineWrapper>
                <div className="group flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm">
                    <Badge type="embryos" number={4} text="Embryos" />
                    <span className="text-muted-foreground">to assign</span>
                  </div>
                  <div className=" opacity-0 group-hover:opacity-100">
                    <CtaButton onClick={gotToAssignSamples}>Organize samples</CtaButton>
                  </div>
                </div>
              </LineWrapper>
            </section>

            <section className="mt-6 space-y-3">
              <DialogText>Stored:</DialogText>
              <LineWrapper>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <Badge type="straws" number={3} text="Straws" />
                  <Badge type="embryos" number={8} text="Embryos" />
                  <span className="text-muted-foreground">Cane 9393103</span>
                </div>
              </LineWrapper>
            </section>

            {/* <div className="mt-8">{newCaseData && <CaseEditor caseId={newCaseData.id} />}</div> */}
          </div>
        </div>
        {/* </ScrollArea> */}
      </DialogContent>
    </Dialog>
  );
}

/** Small helpers (keep UI clean) */
function Info({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={`capitalize ${className}`}>
      <div className="text-sm font-light text-indigo-200">{patientDataMap[label]}</div>
      <div className="mt-0.5 font-light text-sm">{value}</div>
    </div>
  );
}

function Badge({
  type,
  number,
  text,
  isRounded = true,
}: {
  type: string;
  number: number;
  text: string;
  isRounded?: boolean;
}) {
  const colorMap = {
    embryos: {
      textColor: "#241F1C",
      borderColor: "#FFD46E",
      backgroundColor: "#FFD46E",
    },
  };

  const colors = colorMap[type] || colorMap["embryos"];

  return (
    <span
      style={{ borderColor: colors.borderColor }}
      className={cn(
        "min-h-[32px] inline-flex select-none items-center gap-1 border bg-background  text-xs font-medium shadow-sm",
        isRounded && "rounded-full",
      )}
    >
      <span
        style={{ color: colors.textColor, backgroundColor: colors.backgroundColor }}
        className={cn("ml-1 min-h-[24px] min-w-[27px] flex items-center justify-center", isRounded && "rounded-full")}
      >
        {number}
      </span>
      <span className={cn("ml-2 mr-3 flex items-center justify-center", isRounded && "rounded-full")}>{text}</span>
    </span>
  );
}
