import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CtaButton({
  className,
  children,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Button {...props} className={cn(`bg-[var(--primary)]`, className)}>
      {children}
    </Button>
  );
}
