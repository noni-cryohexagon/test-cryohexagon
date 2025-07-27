import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
  return (
    <Accordion type="multiple" className="w-full ">
      {items.map((itemObj) => (
        <div className="w-full flex flex-col border rounded-md mb-4" key={itemObj.id}>
          <AccordionItem key={itemObj.id} value={`item-${itemObj.id}`}>
            <AccordionTrigger className="p-8 text-xl font-light ">
              <div>
                <span className="text-gray-500">{itemObj.totalCount}</span>&nbsp;&nbsp;&nbsp;
                {itemObj.title}
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-14">
              <itemObj.ContentComponent item={itemObj.item} />
            </AccordionContent>
          </AccordionItem>
        </div>
      ))}
    </Accordion>
  );
}
