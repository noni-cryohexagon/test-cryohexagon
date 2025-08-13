import { cn } from "@/lib/utils";
import VSvg from "./VSvg";
import { X } from "lucide-react";

export default function SampleStatusBadge({
  isSelected,
  id,
  stage,
  type,
  isShowClose = false,
  isRounded = false,
  onClick,
}: {
  isSelected: boolean;
  id: string;
  stage: string;
  type: string;
  isShowClose?: boolean;
  isRounded?: boolean;
  onClick: () => void;
}) {
  const colorMap = {
    embryos: {
      textColor: "#241F1C",
      borderColor: "#FFD46E",
      backgroundColor: "#FFD46E",
      indicatorBackgroundColor: "#FFE3A1",
    },
  };

  const colors = colorMap[type] || colorMap["embryos"];

  return (
    <span
      style={{
        backgroundColor: `${isSelected ? colors.indicatorBackgroundColor : "transparent"}`,
        borderColor: colors.borderColor,
      }}
      className={cn(
        "min-h-[32px] inline-flex select-none items-center gap-1 border bg-background  text-xs font-medium shadow-sm",
        "cursor-pointer",
        isRounded && "rounded-full",
      )}
      onClick={onClick}
    >
      {isSelected && (
        <span
          style={{ color: colors.textColor, backgroundColor: colors.backgroundColor }}
          className={cn(
            "opacity-0 ml-1 min-h-[24px] min-w-[24px] flex items-center justify-center rounded-full",
            isSelected && "opacity-100",
          )}
        >
          {isSelected ? <VSvg /> : null}
        </span>
      )}
      <span className={cn("ml-2 mr-3 flex items-center justify-center rounded-full")}>
        <span className="text-xs font-medium mr-1">#{id}</span>
        {stage}
        <span className="text-xs font-medium ml-1">{type}</span>
      </span>
      {isShowClose && (
        <span className="mx-2 cursor-pointer" onClick={() => onClick(id)}>
          <X className="h-4 w-4 text-gray-400" />
        </span>
      )}
    </span>
  );
}
