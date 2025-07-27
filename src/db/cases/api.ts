import supabase  from "@/supabase/index";
import { Case, NewCase } from "./types";

/* ---------- QUERIES ---------- */
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
  const { data, error } = await supabase
    .from("cases")
    .update(changes)
    .eq("id", id)
    .single();
  if (error) throw error;
  return data as Case;
}





// const mockData: Patient[] = [
//   {
//     avatar: "/logo.png", // Placeholder image
//     name: "Yael Mor-Cohen",
//     id: "312538592",
//     caseNo: "4295714",
//     cpuSc: "22.6.25",
//     partner: "Moshe Cohen",
//     timer: "1 h 7 m",
//     embryos: 0,
//     oocytes: 4,
//     moreCount: 9,
//   },
//   {
//     avatar: "/logo.png", // Placeholder image
//     name: "Dvir Shimshon",
//     id: "312538592",
//     caseNo: "7382910",
//     cpuSc: "22.6.25",
//     partner: null,
//     timer: "1 h 5 m",
//     embryos: 1,
//     oocytes: 4,
//     moreCount: 9,
//   },
//   {
//     avatar: "/public/logo.png", // Placeholder image
//     name: "Dalia Shimon",
//     id: "312538592",
//     caseNo: "8463725",
//     cpuSc: "22.6.25",
//     partner: "Meny Shimon",
//     timer: "50 m",
//     embryos: 1,
//     oocytes: 4,
//     moreCount: 0,
//   },
//   {
//     avatar: "/public/logo.png", // Placeholder image
//     name: "Alina Beker",
//     id: "312538592",
//     caseNo: "6528391",
//     cpuSc: "22.6.25",
//     partner: null,
//     timer: "41 m",
//     embryos: 0,
//     oocytes: 4,
//     moreCount: 9,
//   },
//   {
//     avatar: "/public/logo.png", // Placeholder image
//     name: "Sarah Luiz",
//     id: "512639874",
//     caseNo: "1948273",
//     cpuSc: "25.6.25",
//     partner: "David Luiz",
//     timer: "31 m",
//     embryos: 0,
//     oocytes: 5,
//     moreCount: 12,
//   },
//   {
//     avatar: "/public/logo.png", // Placeholder image
//     name: "Tal Rivlin-Amit",
//     id: "413728964",
//     caseNo: "6728910",
//     cpuSc: "30.6.25",
//     partner: "Roni Rivlin",
//     timer: "25 m",
//     embryos: 1,
//     oocytes: 3,
//     moreCount: 7,
//   },
// ];