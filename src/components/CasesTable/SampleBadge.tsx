import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

export default function SampleBadge({
  sample = "",
  type = "",
  isHighlighted = false,
}: {
  sample?: string;
  type?: string;
  isHighlighted?: boolean;
}) {
  const oocyteNumberColor = isHighlighted ? "#FFBEF3" : "#FEECFB";
  const embryoNumberColor = isHighlighted ? "#FFD46E" : "#FEF6E4";

  const style = {
    backgroundColor: type === "oocyte" ? oocyteNumberColor : embryoNumberColor,
    color: "black",
    borderColor: type === "oocyte" ? "#FFBEF3" : "#FFD46E",
  };

  if (type === "sperm") {
    style.backgroundColor = "#E9F9FF";
    style.borderColor = "##A8E8FF";
  }

  const typeLabel = type ? type + "s" : null;
  return (
    <Badge variant="outline" className={cn("rounded-full px-2.5 py-1 text-sm font-light capitalize")} style={style}>
      {sample} {sample ? null : typeLabel}
      {/* <span className={className}>🥚</span> {sample} {type} */}
    </Badge>
  );
}
