import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";

import { useCases } from "@/db/cases/hooks";
import CasesTable, { Patient } from "@/components/CasesTable/CasesTable";

import MainFlowAccordion, { AccordionItemType } from "@/components/MainFlowAccordion";
import casesService, { Batch } from "./casesService";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";

export default function InsertionsView() {
  const { session } = useSession();
  const navigate = useNavigate();
  const { data: cases } = useCases();
  const [batches, setBatches] = useState<Batch[] | null>(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function fetchBatches() {
      if (cases) {
        const newBatches: Batch[] = await casesService.getBatches(cases);
        setBatches(newBatches);
      }
    }
    fetchBatches();
  }, [cases]);

  // Wrapper to map 'item' prop to 'items' prop for CasesTable
  const CasesTableWrapper = ({ item }: { item: { cases: Patient[]; batches: Batch[] } }) => (
    <CasesTable items={item.cases} batches={item.batches} />
  );

  const accordionItems: AccordionItemType<{ cases: Patient[]; batches: Batch[] }>[] = useMemo(() => {
    const filteredCases = cases?.filter((c) => c.case_no.substring(0, filter.length) === filter) || [];
    const sortedCases = filteredCases

      .sort((a, b) => (b.oocytes > 0 ? 1 : 0) - (a.oocytes > 0 ? 1 : 0))
      .sort((a, b) => new Date(a.timer).getTime() - new Date(b.timer).getTime());
    // .sort((a, b) => b.oocytes - a.oocytes);

    return [
      {
        id: "1",
        title: "Prepare for storage",
        ContentComponent: CasesTableWrapper,
        item: { cases: sortedCases, batches: batches || [] },
        totalCount: 4,
      },
      {
        id: "2",
        title: "Ready for storage",
        ContentComponent: () => <CasesTable items={[]} batches={[]} />,
        item: { cases: sortedCases, batches: batches || [] },
        totalCount: 2,
      },
      {
        id: "3",
        title: "Stored today",
        ContentComponent: () => <CasesTable items={[]} batches={[]} />,
        item: { cases: sortedCases, batches: batches || [] },
        totalCount: 1,
      },
    ];
  }, [batches, cases, filter]);

  if (!session) {
    navigate("/auth");
    return null;
  }

  return (
    <main>
      <div className="ml-0">
        <div className="flex items-center mb-4">
          <img src="/magnifying-glass.png" alt="Search" className="inline-block w-5 h-5 mr-0 align-middle" />
          <Input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Case number"
            type="search"
            className="border-0 shadow-none focus:ring-0 focus:border-0 focus:outline-none"
            style={{ outline: "none", boxShadow: "none" }}
          />
        </div>

        <div>
          <MainFlowAccordion items={accordionItems} />
        </div>
      </div>
    </main>
  );
}
