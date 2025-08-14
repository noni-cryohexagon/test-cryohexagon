import { cn } from "@/lib/utils";

export default function LineWrapper({
  hasHoverEffect,
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
  hasHoverEffect?: boolean;
}) {
  return (
    <div
      className={cn(
        `rounded-xl border  px-4 py-3 bg-[#F9F9F9] border-[##D9D9D9]`,
        hasHoverEffect && "hover:bg-[transparent] transition-colors duration-200",
        className,
      )}
    >
      {children}
    </div>
  );
}
