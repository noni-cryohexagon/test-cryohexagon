import { cn } from "@/lib/utils";
import SampleCountBadge from "./SampleCountBadge";
import ArrayDisplay from "./ArrayDisplay";

import { Cane } from "../CaseProcessDialog";

export default function CaneDisplay({ cane }: { cane: Cane }) {
  return (
    <div className="flex items-center">
      <div className="mr-3">
        <SampleCountBadge amount={cane.straws.length} type="embryos" text={`Straws`} onClick={undefined} />
      </div>

      <div className="mr-3">
        <SampleCountBadge
          isRounded
          amount={cane.straws.reduce((acc, s) => acc + s.samples.length, 0)}
          type="embryos"
          text={`embryos DAY 3`}
          onClick={undefined}
        />
      </div>

      <div className="flex text-sm mr-3">
        Cane <span className="ml-2 font-medium text-[var(--primary)]">NEW</span>
      </div>
      <div className="w-6 border-b " />
      <ArrayDisplay
        cellProps={[
          { label: "Room", value: "1", isDarkBG: false },
          { label: "Tank", value: "2", isDarkBG: false },
          { label: "Cell", value: "20 B", isDarkBG: false },
          { label: "Tag", value: "12", isDarkBG: true },
        ]}
      />
    </div>
  );
}
