import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";

import { useCases } from "@/db/cases/hooks";
import CasesTable, { Patient } from "@/components/CasesTable/CasesTable";

import MainFlowAccordion, { AccordionItemType } from "@/components/MainFlowAccordion";
import casesService, { Batch } from "./casesService";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import MgnifyingGlass from "@/assets/mgnifying-glass.svg";

export default function InsertionsView() {
  const { session } = useSession();
  const navigate = useNavigate();
  const { data: cases } = useCases();
  const [batches, setBatches] = useState<Batch[] | null>(null);

  useEffect(() => {
    async function fetchBatches() {
      if (cases) {
        const newBatches: Batch[] = await casesService.getBatches(cases);
        setBatches(newBatches);
      }
    }
    fetchBatches();
  }, [cases]);

  if (!session) {
    navigate("/auth");
    return null;
  }

  // Wrapper to map 'item' prop to 'items' prop for CasesTable
  const CasesTableWrapper = ({ item }: { item: { cases: Patient[]; batches: Batch[] } }) => (
    <CasesTable items={item.cases} batches={item.batches} />
  );

  const accordionItems: AccordionItemType<{ cases: Patient[]; batches: Batch[] }>[] = useMemo(
    () => [
      {
        id: "1",
        title: "Prepare for storage",
        ContentComponent: CasesTableWrapper,
        item: { cases: cases ?? [], batches: batches ?? [] },
        totalCount: 4,
      },
      {
        id: "2",
        title: "Ready for storage",
        ContentComponent: () => <CasesTable items={[]} batches={[]} />,
        item: { cases: cases ?? [], batches: batches ?? [] },
        totalCount: 2,
      },
      {
        id: "3",
        title: "Stored today",
        ContentComponent: () => <CasesTable items={[]} batches={[]} />,
        item: { cases: cases ?? [], batches: batches ?? [] },
        totalCount: 1,
      },
    ],
    [batches, cases],
  );

  return (
    <main>
      <div className="ml-2">
        <div className="flex items-center mb-4">
          <img src="/magnifying-glass.png" alt="Search" className="inline-block w-5 h-5 mr-0 align-middle" />
          {/* <MgnifyingGlass />> */}
          <Input placeholder="Case number" type="search" className="border-0 shadow-none" />
        </div>

        <div className="">
          <MainFlowAccordion items={accordionItems} />
        </div>
      </div>
    </main>
  );
}
