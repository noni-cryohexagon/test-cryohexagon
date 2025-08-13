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

import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Patient } from "./CasesTable";
import { useCase } from "@/db/cases/hooks";
import { Avatar } from "@radix-ui/react-avatar";
import SpotSvg from "./SpotSvg";

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

      <DialogContent
        // Make this the positioning context for floating bits
        className="w-[1440px] min-w-[1370px] max-w-[95vw]  min-h-[650px] max-h-[650px] p-0  rounded-2xl border-0"
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
        <div className="min-h-[494px] px-6 pb-6 overflow-hidden">
          <section className="space-y-3">
            <h3 className="text-base font-medium">Prepare for storage:</h3>
            <div className="rounded-xl border bg-muted/30 px-4 py-3">
              <div className="flex items-center gap-3 text-sm">
                <Badge>4 Embryos</Badge>
                <span className="text-muted-foreground">to assign</span>
              </div>
            </div>
          </section>

          <section className="mt-6 space-y-3">
            <h3 className="text-base font-medium">Stored:</h3>
            <div className="rounded-xl border bg-muted/30 px-4 py-3">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <Badge>3 Straws</Badge>
                <Badge>8 Embryos</Badge>
                <span className="text-muted-foreground">Cane 9393103</span>
              </div>
            </div>
          </section>

          {/* <div className="mt-8">{newCaseData && <CaseEditor caseId={newCaseData.id} />}</div> */}
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

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border bg-background px-2.5 py-0.5 text-xs font-medium shadow-sm">
      {children}
    </span>
  );
}
