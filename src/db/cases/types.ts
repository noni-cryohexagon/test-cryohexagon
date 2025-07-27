export type Case = Database["public"]["Tables"]["cases"]["Row"];   // auto‑gen
export type NewCase = Omit<Case, "id" | "created_at">;             // helper