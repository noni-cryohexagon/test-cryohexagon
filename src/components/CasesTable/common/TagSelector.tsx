import { cn } from "@/lib/utils";
import { useState } from "react";

type TagOption = {
  id: string;
  color: string;
  value: string | number;
};

type TagSelectorProps = {
  className?: string;
  options: TagOption[];
  defaultSelected?: string;
  onChange?: (selectedId: string) => void;
};

export default function TagSelector({ className, options = [], defaultSelected, onChange }: TagSelectorProps) {
  const [selectedTag, setSelectedTag] = useState<string | undefined>(defaultSelected);

  const handleTagSelect = (id: string) => {
    setSelectedTag(id);
    if (onChange) {
      onChange(id);
    }
  };

  return (
    <div className={cn("flex gap-4", className)}>
      {options.map((tag) => (
        <div
          key={tag.id}
          className="relative shadow-sm rounded-md cursor-pointer hover:opacity-90 transition-all"
          onClick={() => handleTagSelect(tag.id)}
        >
          <div
            className={cn("w-24 h-24 rounded-md flex items-center justify-center text-2xl font-bold")}
            style={{ backgroundColor: tag.color }}
          >
            {tag.value}
          </div>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <div
              className={cn(
                "w-4 h-4 rounded-full border-2 border-black flex items-center justify-center",
                selectedTag === tag.id ? "bg-white" : "bg-transparent",
              )}
            >
              {selectedTag === tag.id && <div className="w-2 h-2 rounded-full bg-black" />}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
