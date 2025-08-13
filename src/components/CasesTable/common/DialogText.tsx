import { cn } from "@/lib/utils";

export default function DialogText({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn(`text-lg font-light `, className)}>{children}</div>;
}
