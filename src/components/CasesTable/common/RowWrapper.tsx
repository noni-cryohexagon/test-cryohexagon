import { cn } from "@/lib/utils";

export default function RowWrapper({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("mb-4 flex-1 flex flex-row items-center  border-b border-[##D9D9D9] pb-4", className)}>
      {children}
    </div>
  );
}
