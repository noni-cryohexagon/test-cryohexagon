import { cn } from "@/lib/utils";

export default function LineWrapper({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn(`rounded-xl border  px-4 py-3 bg-[#F9F9F9] border-[##D9D9D9]`, className)}>{children}</div>;
}
