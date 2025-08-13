import { cn } from "@/lib/utils";

type CellProps = {
  label: string;
  value: string;
  isDarkBG: boolean;
};

export default function ArrayDisplay({ cellProps, className }: { cellProps: CellProps[]; className?: string }) {
  return (
    <div className="px-1 py-1 flex items-center justify-between border rounded-sm overflow-hidden">
      {cellProps.map((cell, index) => (
        <div key={cell.label} className={cn(`relative mr-3 text-lg font-light `)}>
          <div className={cn(` pl-3 flex items-center text-lg font-light overflow-hidden`, index > 0 && "border-l")}>
            <span className="text-[14px] text-[#807E7E]">{cell.label}</span>
            <span className={cn("ml-3 text-[16px] font-medium")}>{cell.value}</span>
            {cell.isDarkBG && (
              <span className={cn("absolute -top-1 -right-6 w-12 h-[34px] -z-1", "bg-[#F7F7F7]")}></span>
            )}
            {/* <div className={cn("absolute top-1 right-0 bg-black h-full w-[1px] ")}></div> */}
          </div>
        </div>
      ))}
    </div>
  );
}
