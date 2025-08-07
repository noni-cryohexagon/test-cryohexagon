import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type Tab = {
  id: string;
  component: React.FC<any>;
  title: string;
  badge?: number;
};

interface IProps {
  tabs: Tab[];
  activeTabId?: string;
  onTabChange?: (tabId: string) => void;
  children?: React.ReactNode;
}

export default function AppsTabs({ tabs, activeTabId, onTabChange, children }: IProps) {
  const defaultTab = tabs[0]?.id || "";
  const currentTab = activeTabId || defaultTab;
  //
  return (
    <div className="mx-10">
      <Tabs className="" value={currentTab} onValueChange={onTabChange}>
        <div className="mb-4 relative">
          <TabsList className="p-1 rounded-lg bg-transparent ">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex-1  py-5 px-6  data-[state=active]:border-b-4 data-[state=active]:border-b-black  data-[state=active]:text-primary data-[state=active]:font-medium text-lg font-light  rounded-none cursor-pointer text-gray-500 hover:text-black "
              >
                {tab.title}
                {tab.badge && (
                  <span
                    className={`px-[6px] py-[2px] ml-2 items-center justify-center rounded-full  text-xs font-medium text-white transform -translate-y-1/2 -translate-x-1/2 ${currentTab === tab.id ? "bg-red-400" : "bg-red-300"}`}
                  >
                    {tab.badge}
                  </span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="w-65 border-b-1 absolute" style={{ bottom: -5 }} />
        </div>

        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id}>
            {children}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
