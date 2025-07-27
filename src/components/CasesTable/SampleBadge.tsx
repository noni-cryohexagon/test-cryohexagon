import { Badge } from "../ui/badge";

export default function SampleBadge({ sample, color }: { sample: string; color: string }) {
  return (
    <Badge variant="outline" className={`bg-${color}-50 text-${color}-700 border-${color}-200`}>
      <span className="mr-1">🥚</span> {sample} embryo
    </Badge>
  );
}
