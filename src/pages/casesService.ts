import { Patient } from "@/components/CasesTable/CasesTable";

/* Private */
const SAMPLES_IN_CANE = 4;

type SampleType = "oocyte" | "embryo";

export type Batch = {
  id: string;
  status: "prepare" | "ready" | "stored";
  caseId: string;
  caneId: string | null;
  sampleType: SampleType;
  numberOfSamples: number;
};

function getSampleType(c: Patient): SampleType {
  return c.oocytes > 0 ? "oocyte" : "embryo";
}

async function computeBatches(cases: Patient[]): Promise<Batch[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000)); // Simulate network delay

  const distributionMap: Batch[] = [];
  cases.forEach((c) => {
    const amountSamples = c.embryos + c.oocytes; //todo: this is basically very wrong;
    const batchCount = Math.ceil(amountSamples / SAMPLES_IN_CANE);
    for (let i = 0; i < batchCount; i++) {
      const batch: Batch = {
        id: "BATCH_" + Math.random().toString(36).substring(2, 15),
        status: "prepare",
        caseId: c.case_no,
        caneId: "CANE_" + Math.random().toString(36).substring(2, 15),
        sampleType: getSampleType(c),
        numberOfSamples: Math.min(amountSamples - i * SAMPLES_IN_CANE, SAMPLES_IN_CANE),
      };
      distributionMap.push(batch);
    }
  });
  return distributionMap;
}

/* Public */

async function getBatches(cases: Patient[]) {
  if (!cases) return [];
  const batches = await computeBatches(cases);
  return batches;
}

const casesService = { getBatches };

export default casesService;
