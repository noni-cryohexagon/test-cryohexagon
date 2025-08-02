import { cn } from "@/lib/utils";
import { EmbryoData } from "./CaseEditor";
import { Badge } from "../ui/badge";

export default function CaseEditorRow({ entry, className }: { entry: EmbryoData; className?: string }) {
  return (
    <div className={cn(className)}>
      <div>
        <div className="text-gray-500 text-sm">Room</div>
        <div>{entry.room}</div>
      </div>
      <div>
        <div className="text-gray-500 text-sm">Tank</div>
        <div>{entry.tank}</div>
      </div>
      <div>
        <div className="text-gray-500 text-sm">Canister</div>
        <div>{entry.canister}</div>
      </div>
      <div>
        <div className="text-gray-500 text-sm">Cell</div>
        <div>{entry.cell}</div>
      </div>
      <div>
        <div className="text-gray-500 text-sm">Cane</div>
        <div>{entry.cane}</div>
      </div>
      <div>
        <div className="text-gray-500 text-sm">Tag</div>
        <div>
          <Badge className="rounded-full bg-amber-100 text-amber-800 hover:bg-amber-200">{entry.tag}</Badge>
        </div>
      </div>
    </div>
  );
}
