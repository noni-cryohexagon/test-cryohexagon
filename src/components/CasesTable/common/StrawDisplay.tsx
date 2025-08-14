import { cn } from "@/lib/utils";

import { Straw } from "../CaseProcessDialog";
import SampleStatusBadge from "./SampleStatusBadge";

export default function StrawDisplay({ straw }: { cane: Straw }) {
  return (
    <div className="flex items-center">
      <div className="mr-4 px-4 py-1 bg-[#FFD46E]  rounded-xs text-sm">Straw #{straw.id}</div>

      {straw.samples.map((sample) => {
        if (!sample) return null;
        return (
          <div className="mr-3" key={sample.id}>
            <SampleStatusBadge
              id={sample.id}
              stage={sample.stage}
              type={sample.type}
              isShowClose
              isSelected={false}
              isRounded={true}
              onClick={() => {}}
            />
          </div>
        );
      })}
    </div>
  );
}
