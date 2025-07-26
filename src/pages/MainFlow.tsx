import { Link, useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import { Button } from "@/components/ui/button";
import supabase from "@/supabase";

export default function MainFlow() {
  const { session } = useSession();
  const navigate = useNavigate();
  return (
    <main className="p-4 flex max-w-3xl mx-auto flex-col gap-4 mt-10">
      <h1 className="text-3xl font-bold">This is the Main Flow Page</h1>
      
    </main>
  );
}

