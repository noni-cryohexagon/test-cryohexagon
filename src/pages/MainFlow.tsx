import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";

import { useCases } from "@/db/cases/hooks";
import CasesTable, { Patient } from "@/components/CasesTable/CasesTable";

import MainFlowAccordion, { AccordionItemType } from "@/components/MainFlowAccordion";
import casesService, { Batch } from "./casesService";
import { useEffect, useState } from "react";

// Create mock data based on the image

export default function MainFlow() {
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

  const accordionItems: AccordionItemType<{ cases: Patient[]; batches: Batch[] }>[] = [
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
      ContentComponent: CasesTableWrapper,
      item: { cases: cases ?? [], batches: batches ?? [] },
      totalCount: 2,
    },
    {
      id: "3",
      title: "Stored today",
      ContentComponent: CasesTableWrapper,
      item: { cases: cases ?? [], batches: batches ?? [] },
      totalCount: 1,
    },
  ];

  return (
    <main className="p-4 flex w-full mx-auto flex-col gap-4 mt-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">4&nbsp;&nbsp;&nbsp;Prepare for freezing</h1>
      </div>

      <div className="">
        <MainFlowAccordion items={accordionItems} />
      </div>
    </main>
  );
}
