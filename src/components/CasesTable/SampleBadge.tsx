import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

export default function SampleBadge({ sample = "", type = "" }: { sample?: string; type?: string }) {
  const oocyteNumberColor = sample ? "#FB7EE4" : "#BC5FAB";
  const embryoNumberColor = sample ? "#F7C348" : "#B99236";

  const style = {
    backgroundColor: type === "oocyte" ? "#FEECFB" : "#FEF6E4",
    color: type === "oocyte" ? oocyteNumberColor : embryoNumberColor,
    borderColor: type === "oocyte" ? "#FEECFB" : "#FEF6E4",
  };
  const typeLabel = type ? type + "s" : null;

  return (
    <Badge variant="outline" className={cn("rounded-sm px-2 py-1 text-sm font-light capitalize")} style={style}>
      {sample} {sample ? null : typeLabel}
      {/* <span className={className}>🥚</span> {sample} {type} */}
    </Badge>
  );
}
