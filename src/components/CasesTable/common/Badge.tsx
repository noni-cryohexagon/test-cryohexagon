import { cn } from "@/lib/utils";

export default function Badge({
  type,
  number,
  text,
  isRounded = true,
}: {
  type: string;
  number: number;
  text: string;
  isRounded?: boolean;
}) {
  const colorMap = {
    embryos: {
      textColor: "#241F1C",
      borderColor: "#FFD46E",
      backgroundColor: "#FFD46E",
    },
    oocytes: {
      textColor: "#241F1C",
      borderColor: "#FFBEF3",
      backgroundColor: "#FFBEF3",
    },
  };

  const colors = colorMap[type] || colorMap["embryos"];
  console.log('type', type)

  return (
    <span
      style={{ borderColor: colors.borderColor }}
      className={cn(
        "min-h-[32px] inline-flex select-none items-center gap-1 border bg-background  text-xs font-medium shadow-sm",
        isRounded && "rounded-full",
      )}
    >
      <span
        style={{ color: colors.textColor, backgroundColor: colors.backgroundColor }}
        className={cn("ml-1 min-h-[24px] min-w-[27px] flex items-center justify-center", isRounded && "rounded-full")}
      >
        {number}
      </span>
      <span className={cn("ml-2 mr-3 flex items-center justify-center", isRounded && "rounded-full")}>{text}</span>
    </span>
  );
}
