import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useCase } from "@/db/cases/hooks";
import CaseEditorRow from "./CaseEditorRow";
import VerticalTimeIndicator from "./common/VerticalTimeIndicator";

export type EmbryoData = {
  id: string;
  count: number;
  day: number;
  room: number;
  tank: number;
  canister: number;
  cell: string;
  cane: string;
  tag: string;
  status: "prepare" | "ready" | "stored";
};

// Sample data based on the screenshot
const embryoEntries: EmbryoData[] = [
  {
    id: "1",
    count: 3,
    day: 3,
    room: 2,
    tank: 3,
    canister: 25,
    cell: "A",
    cane: "38825029",
    tag: "12",
    status: "prepare",
  },
  {
    id: "2",
    count: 1,
    day: 3,
    room: 2,
    tank: 3,
    canister: 25,
    cell: "C",
    cane: "New",
    tag: "7",
    status: "prepare",
  },
  {
    id: "3",
    count: 1,
    day: 3,
    room: 2,
    tank: 3,
    canister: 25,
    cell: "C",
    cane: "New",
    tag: "7",
    status: "prepare",
  },
  {
    id: "4",
    count: 1,
    day: 3,
    room: 2,
    tank: 3,
    canister: 25,
    cell: "B",
    cane: "38825029",
    tag: "18",
    status: "ready",
  },
  {
    id: "5",
    count: 1,
    day: 3,
    room: 2,
    tank: 3,
    canister: 25,
    cell: "B",
    cane: "38825029",
    tag: "18",
    status: "stored",
  },
];

export default function CaseEditor({ caseId }: { caseId: string }) {
  const { data: caseData, isLoading } = useCase(caseId);

  if (isLoading) {
    return <div className="p-4">Loading case details...</div>;
  }

  if (!caseData) {
    return <div className="p-4">Case not found</div>;
  }

  const prepareEntries = embryoEntries.filter((entry) => entry.status === "prepare");
  const readyEntries = embryoEntries.filter((entry) => entry.status === "ready");
  const storedEntries = embryoEntries.filter((entry) => entry.status === "stored");

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 p-2 bg-white">
        <Avatar className="h-12 w-12">
          <img src={caseData.avatar} alt={caseData.name} />
        </Avatar>
        <div className="grid grid-cols-7 gap-6 flex-1 text-sm">
          <div>
            <div className="text-gray-500">Name</div>
            <div>{caseData.name}</div>
          </div>
          <div>
            <div className="text-gray-500">Case</div>
            <div>{caseData.case_no}</div>
          </div>
          <div>
            <div className="text-gray-500">ID</div>
            <div>{caseData.national_id}</div>
          </div>
          <div>
            <div className="text-gray-500">CPU</div>
            <div>{caseData.cpu_sc}</div>
          </div>
          <div>
            <div className="text-gray-500">Serology</div>
            <div>Negative</div>
          </div>
          <div>
            <div className="text-gray-500">Oocyte source</div>
            <div>Sperm source</div>
          </div>
          <div className="">
            <div className="text-gray-500">Partner</div>
            <div>{caseData.partner || "None"}</div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="relative">
          <VerticalTimeIndicator className="" height={100} hours={1} minutes={50} />

          <div className="ml-[85px]">
            <h3 className="font-medium mb-4">Prepare for storage</h3>
            {prepareEntries.map((entry) => (
              <div key={entry.id} className="mb-4">
                <div className="flex items-center mb-2">
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 mr-2">
                    {entry.count} embryo Day {entry.day}
                  </Badge>
                </div>
                <CaseEditorRow entry={entry} className="grid grid-cols-6 gap-4 text-center" />
              </div>
            ))}
          </div>

          <div className="ml-[85px] mt-12">
            <h3 className="font-medium mb-4">Ready for storage</h3>
            {readyEntries.map((entry) => (
              <div key={entry.id} className="mb-4">
                <div className="flex items-center mb-2">
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 mr-2">
                    {entry.count} embryo Day {entry.day}
                  </Badge>
                </div>
                <CaseEditorRow entry={entry} className="grid grid-cols-6 gap-4 text-center" />
              </div>
            ))}
          </div>

          <div className="ml-[85px] mt-12">
            <h3 className="font-medium mb-4">Stored</h3>
            {storedEntries.map((entry) => (
              <div key={entry.id} className="mb-4">
                <div className="flex items-center mb-2">
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 mr-2">
                    {entry.count} embryo Day {entry.day}
                  </Badge>
                </div>
                <CaseEditorRow entry={entry} className="grid grid-cols-6 gap-4 text-center" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
