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

  return (
    <Accordion type="multiple" className="w-full">
      {items.map((itemObj) => { 
        const isOpen = isOpenMap.get(itemObj.id);
        return (
            <div className={`
              p-0 w-full flex flex-col mb-2 bg-white rounded-2xl border-b-3 border-transparent
              hover:shadow-lg hover:border-[#807E7E] transition-all duration-200
            `} key={itemObj.id}>
            <AccordionItem
              key={itemObj.id}
              value={`item-${itemObj.id}`}
              onClick={() => {
              setIsOpenMap((prev) => new Map(prev).set(itemObj.id, !prev.get(itemObj.id)));
              }}
            >
              <AccordionTrigger
                className="min-h-[100px] p-[25px] text-xl font-extralight flex items-center no-underline hover:no-underline"
              >
                <div className='h-full flex items-center'>
                  <span className="w-20 text-3xl text-center">{itemObj.totalCount}</span>
                  &nbsp;&nbsp;&nbsp;{itemObj.title}
                </div>
              </AccordionTrigger>
                <AccordionContent className="pb-4 rounded-b-2xl bg-white">
                  <itemObj.ContentComponent item={itemObj.item} />
                </AccordionContent>
            </AccordionItem>
            </div>
      );})}
    </Accordion>
  );
}
