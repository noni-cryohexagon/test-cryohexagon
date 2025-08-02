import supabase from "@/supabase/index";
import { Case, NewCase } from "./types";

/* ---------- QUERIES ---------- */
export async function getCase(id: string) {
  const { data, error } = await supabase.from("cases").select("*").eq("id", id).single();
  if (error) throw error;
  return data as Case;
}

export async function listCases() {
  //   return mockData as Case[];
  const { data, error } = await supabase.from("cases").select("*").order("created_at");
  if (error) throw error;
  return data as Case[];
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
