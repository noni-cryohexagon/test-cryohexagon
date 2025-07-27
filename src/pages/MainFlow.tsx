import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";

import { useCases } from "@/db/cases/hooks";
import CasesTable from "@/components/CasesTable";


// Create mock data based on the image


export default function MainFlow() {
  const { session } = useSession();
  const navigate = useNavigate();
  const { data: cases } = useCases();
  if (!session) {
    navigate("/auth");
    return null;
  }

  return (
    <main className="p-4 flex w-full mx-auto flex-col gap-4 mt-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">4&nbsp;&nbsp;&nbsp;Prepare for freezing</h1>
      </div>
      
      <div className="border rounded-md">
        <CasesTable cases={cases || []} />
      </div>
    </main>
  );
}
