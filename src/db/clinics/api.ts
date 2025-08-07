import supabase from "@/supabase/index";
import { Clinic, NewClinic } from "./types";

/* ---------- QUERIES ---------- */
export async function getClinic(id: string) {
  const { data, error } = await supabase.from("clinics").select("*").eq("id", id).single();
  if (error) throw error;
  return data as Clinic;
}

export async function listClinics() {
  const { data, error } = await supabase.from("clinics").select("*").order("name");
  if (error) throw error;
  return data as Clinic[];
}

export async function getActiveClinics() {
  const { data, error } = await supabase.from("clinics").select("*").eq("is_active", true).order("name");
  if (error) throw error;
  return data as Clinic[];
}

export async function getClinicsByCity(city: string) {
  const { data, error } = await supabase.from("clinics").select("*").eq("city", city).order("name");
  if (error) throw error;
  return data as Clinic[];
}

/* ---------- MUTATIONS ---------- */
export async function createClinic(payload: NewClinic) {
  const { data, error } = await supabase.from("clinics").insert(payload).single();
  if (error) throw error;
  return data as Clinic;
}

export async function updateClinic(id: string, changes: Partial<Clinic>) {
  const { data, error } = await supabase.from("clinics").update(changes).eq("id", id).single();
  if (error) throw error;
  return data as Clinic;
}

export async function toggleClinicActive(id: string, isActive: boolean) {
  const { data, error } = await supabase.from("clinics").update({ is_active: isActive }).eq("id", id).single();
  if (error) throw error;
  return data as Clinic;
}
