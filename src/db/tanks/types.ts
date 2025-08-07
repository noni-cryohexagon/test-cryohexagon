import type { Database } from "@/supabase/supabase";

export type Tank = Database["public"]["Tables"]["tanks"]["Row"]; // auto‑gen
export type NewTank = Omit<Tank, "id">; // helper

export type TankModel = "MVE1426" | "MVE616" | "Phase_Two_HC14" | "IC_Biomedical_10K" | "S1500_AB-CBS" | "MVE510";
export type Serology = "positive" | "negative";
export type SampleType = "oocyte" | "embryo" | "sperm";
