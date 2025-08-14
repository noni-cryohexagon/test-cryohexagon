import { cn } from "@/lib/utils";
import { useState } from "react";
import "@fontsource/playpen-sans"; // Import Playpen Sans font

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

  // Define a CSS class for the Playpen Sans font
  const playpenSansClass = "font-['Playpen_Sans']";

  return (
    <div className={cn("flex gap-4", className)}>
      {options.map((tag) => (
        <div
          key={tag.id}
          className="relative pb-15 rounded-xl cursor-pointer hover:opacity-90 transition-all  shadow-[0px_6px_17px_rgba(0,0,0,0.2)]"
          onClick={() => handleTagSelect(tag.id)}
        >
          <div
            className={cn(
              "m-2 w-44 h-44 rounded-md flex items-center justify-center text-2xl font-bold",
              playpenSansClass,
            )}
            style={{ backgroundColor: tag.color }}
          >
            {selectedTag === tag.id ? 12 : null}
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
