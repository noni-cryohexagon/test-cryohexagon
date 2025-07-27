import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";

import { useCases } from "@/db/cases/hooks";
import CasesTable, { Patient } from "@/components/CasesTable";

import MainFlowAccordion, { AccordionItemType } from "@/components/MainFlowAccordion";

// Create mock data based on the image

export default function MainFlow() {
  const { session } = useSession();
  const navigate = useNavigate();
  const { data: cases } = useCases();
  if (!session) {
    navigate("/auth");
    return null;
  }

  // Wrapper to map 'item' prop to 'items' prop for CasesTable
  const CasesTableWrapper = ({ item }: { item: Patient[] }) => <CasesTable items={item} />;

  const accordionItems: AccordionItemType<Patient[]>[] = [
    {
      id: "1",
      title: "Prepare for freezing",
      ContentComponent: CasesTableWrapper,
      item: cases ?? [],
      totalCount: 4,
    },
    {
      id: "2",
      title: "Ready for freezing",
      ContentComponent: CasesTableWrapper,
      item: cases ?? [],
      totalCount: 2,
    },
    {
      id: "3",
      title: "Stored",
      ContentComponent: CasesTableWrapper,
      item: cases ?? [],
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
