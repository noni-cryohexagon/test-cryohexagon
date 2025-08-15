import { cn } from "@/lib/utils";

export default function SampleCountBadge({
  amount,
  type,
  text,
  isRounded,
  onClick,
}: {
  amount: number;
  type: string;
  text: string;
  isRounded?: boolean;
  onClick: (() => void) | undefined;
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
        backgroundColor: `transparent`,
        // backgroundColor: `${amount ? colors.indicatorBackgroundColor : "transparent"}`,
        borderColor: colors.borderColor,
      }}
      className={cn(
        "min-h-[32px] inline-flex select-none items-center gap-1 border   text-xs font-medium shadow-sm",
        onClick ? "" : "cursor-pointer pointer-events-none",
        isRounded && "rounded-full",
      )}
      onClick={onClick}
    >
      {text && (
        <span
          style={{ color: colors.textColor, backgroundColor: colors.backgroundColor }}
          className={cn(
            "opacity-0 ml-1 min-h-[24px] min-w-[24px] flex items-center justify-center ",
            text && "opacity-100",
            isRounded && "rounded-full",
          )}
        >
          {amount}
        </span>
      )}
      <span className={cn("ml-2 mr-3 flex items-center justify-center rounded-full capitalize")}>{text}</span>
    </span>
  );
}
