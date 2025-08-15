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
    <div>
      <Tabs value={currentTab} onValueChange={onTabChange}>
        <div className="mb-4 relative">
          <TabsList className="bg-transparent p-0">
            {tabs.map((tab) => (
                <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={`
                  flex-1 py-5 px-4 data-[state=active]:border-b-5 data-[state=active]:border-b-black 
                  data-[state=active]:text-black data-[state=active]:font-medium text-lg font-light
                  rounded-none cursor-pointer text-gray-500 hover:text-black relative
                `}
                >
                {tab.title}
                {tab.badge && (
                  <span className={`
                    px-[6px] py-[2px] ml-2 items-center justify-center rounded-full  text-xs
                    font-medium text-white transform -translate-y-1/2 -translate-x-1/2
                    ${currentTab === tab.id ? "bg-red-400" : "bg-red-300"}
                  `}>
                  {tab.badge}
                  </span>
                )}
                </TabsTrigger>
            ))}
          </TabsList>
          <div className="w-full border-b-1 border-[#807E7E] absolute left-0 right-0" style={{ bottom: -5 }} />
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
