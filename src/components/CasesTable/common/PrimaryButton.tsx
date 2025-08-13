import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function PrimaryButton({
  className,
  children,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Button {...props} className={cn(``, className)}>
      {children}
    </Button>
  );
}
