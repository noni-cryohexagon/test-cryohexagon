import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";

export interface AccordionItemType<T> {
  id: string;
  title: string;
  ContentComponent: React.ComponentType<{ item: T }>;
  item: T;
  totalCount: number;
}

interface CasesTableProps<T> {
  items: AccordionItemType<T>[];
}

export default function MainFlowAccordion<T>({ items }: CasesTableProps<T>) {
  const [isOpenMap, setIsOpenMap] = useState<Map<string, boolean>>(new Map());
  console.log("🚀 ~ MainFlowAccordion ~ isOpenMap:", isOpenMap);

  return (
    <Accordion type="multiple" className="w-full w-">
      {items.map((itemObj) => {
        return (
          <div className="p-0 w-full flex flex-col border rounded-sm mb-4" key={itemObj.id}>
            <AccordionItem
              key={itemObj.id}
              value={`item-${itemObj.id}`}
              onClick={() => {
                setIsOpenMap((prev) => new Map(prev).set(itemObj.id, !prev.get(itemObj.id)));
              }}
            >
              <AccordionTrigger
                className={`p-6 text-xl font-light`}
                style={{ background: isOpenMap.get(itemObj.id) ? "#ffff" : "#F9F9F7" }}
              >
                <div>
                  <span className="text-gray-500">{itemObj.totalCount}</span>&nbsp;&nbsp;&nbsp;
                  {itemObj.title}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <itemObj.ContentComponent item={itemObj.item} />
              </AccordionContent>
            </AccordionItem>
          </div>
        );
      })}
    </Accordion>
  );
}
