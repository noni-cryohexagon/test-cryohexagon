import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

export default function SampleBadge({ sample = "", type = "" }: { sample?: string; type?: string }) {
  console.log("🚀 ~ SampleBadge ~ type:", type);
  const className =
    type === "oocyte" ? `bg-yellow-500 text-yellow-700 border-yellow-200` : `bg-blue-500 text-blue-700 border-blue-200`;

  return (
    <Badge variant="outline" className={cn("rounded-sm", className)}>
      {sample} {type}
      {/* <span className={className}>🥚</span> {sample} {type} */}
    </Badge>
  );
}
