import supabase from "@/supabase/index";
import { Cell, NewCell } from "./types";

/* ---------- QUERIES ---------- */
export async function getCell(id: string) {
  const { data, error } = await supabase.from("cells").select("*").eq("id", id).single();
  if (error) throw error;
  return data as Cell;
}

export async function listCells() {
  const { data, error } = await supabase.from("cells").select("*");
  if (error) throw error;
  return data as Cell[];
}

export async function getCellsByTank(tankId: string) {
  const { data, error } = await supabase.from("cells").select("*").eq("tank_id", tankId);
  if (error) throw error;
  return data as Cell[];
}

/* ---------- MUTATIONS ---------- */
export async function createCell(payload: NewCell) {
  const { data, error } = await supabase.from("cells").insert(payload).single();
  if (error) throw error;
  return data as Cell;
}

export async function updateCell(id: string, changes: Partial<Cell>) {
  const { data, error } = await supabase.from("cells").update(changes).eq("id", id).single();
  if (error) throw error;
  return data as Cell;
}

export async function toggleCellInTank(id: string, isInTank: boolean) {
  const { data, error } = await supabase.from("cells").update({ is_in_tank: isInTank }).eq("id", id).single();
  if (error) throw error;
  return data as Cell;
}
