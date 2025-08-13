import supabase from "@/supabase/index";
import { Case, NewCase } from "./types";
import moment from "moment";

// hack!!!
const caseIdToPatientId = (c: any) => {
  // return a vase where the id (92c7d74c-e7a2-42d9-b6c1-01423a338909) is '312538592' - a number of 9 digits
  const date = c.cpu_sc;
  const formattedDate = date ? moment(date).format("D.M.YY") : "";
  return {
    ...c,
    cpu_sc: formattedDate,
    hackId: new String(c.id)
      .split("")
      .map((s: string) => parseInt(s))
      .filter((a: number) => !isNaN(a))
      .splice(0, 9)
      .join(""),
  };
};

/* ---------- QUERIES ---------- */
export async function getCase(id: string) {
  const { data, error } = await supabase.from("cases").select("*").eq("id", id).single();
  if (error) throw error;
  return caseIdToPatientId(data) as Case;
}

export async function listCases() {
  //   return mockData as Case[];
  const { data, error } = await supabase.from("cases").select("*").order("created_at");
  if (error) throw error;
  return data.map(caseIdToPatientId) as Case[];
}

/* ---------- MUTATIONS ---------- */
export async function createCase(payload: NewCase) {
  const { data, error } = await supabase.from("cases").insert(payload).single();
  if (error) throw error;
  return data as Case;
}

export async function updateCase(id: string, changes: Partial<Case>) {
  const { data, error } = await supabase.from("cases").update(changes).eq("id", id).single();
  if (error) throw error;
  return data as Case;
}
