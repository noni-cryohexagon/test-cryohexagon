import supabase from "@/supabase/index";
import { Tank, NewTank } from "./types";

/* ---------- QUERIES ---------- */
export async function getTank(id: string) {
  const { data, error } = await supabase.from("tanks").select("*").eq("id", id).single();
  if (error) throw error;
  return data as Tank;
}

export async function listTanks() {
  const { data, error } = await supabase.from("tanks").select("*");
  if (error) throw error;
  return data as Tank[];
}

export async function getAvailableTanks() {
  const { data, error } = await supabase.from("tanks").select("*").eq("is_available", true);
  if (error) throw error;
  return data as Tank[];
}

export async function getTanksByClinic(clinicId: string) {
  const { data, error } = await supabase.from("tanks").select("*").eq("clinic_id", clinicId);
  if (error) throw error;
  return data as Tank[];
}

/* ---------- MUTATIONS ---------- */
export async function createTank(payload: NewTank) {
  const { data, error } = await supabase.from("tanks").insert(payload).single();
  if (error) throw error;
  return data as Tank;
}

export async function updateTank(id: string, changes: Partial<Tank>) {
  const { data, error } = await supabase.from("tanks").update(changes).eq("id", id).single();
  if (error) throw error;
  return data as Tank;
}

export async function toggleTankAvailability(id: string, isAvailable: boolean) {
  const { data, error } = await supabase.from("tanks").update({ is_available: isAvailable }).eq("id", id).single();
  if (error) throw error;
  return data as Tank;
}
