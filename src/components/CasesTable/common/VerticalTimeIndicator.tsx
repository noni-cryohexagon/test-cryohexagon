import { Badge } from "@/components/ui/badge";

interface VerticalTimeIndicatorProps {
  height: number;
  hours: number;
  minutes: number;
  className?: string;
}

export default function VerticalTimeIndicator({ height, hours, minutes, className }: VerticalTimeIndicatorProps) {
  return (
    <div className={`relative ${className}`}>
      <div style={{ height: height + "px" }} className="absolute left-0 top-0  w-[1px] bg-[#B4B5FF]"></div>
      <Badge className="absolute right-[120px] top-0 bg-indigo-50 hover:bg-indigo-600 text-[var(--primary)]">
        {hours && hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`}
      </Badge>
    </div>
  );
}
