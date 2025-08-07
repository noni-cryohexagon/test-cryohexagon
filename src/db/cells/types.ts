import type { Database } from "@/supabase/supabase";

export type Cell = Database["public"]["Tables"]["cells"]["Row"]; // auto‑gen
export type NewCell = Omit<Cell, "id">; // helper

export type CellLetter = "a" | "b" | "c" | "d";
export type CellHeight = "short" | "tall";
