import type { Database } from "@/supabase/supabase";

export type Clinic = Database["public"]["Tables"]["clinics"]["Row"];
export type NewClinic = Omit<Clinic, "id" | "created_at">;
