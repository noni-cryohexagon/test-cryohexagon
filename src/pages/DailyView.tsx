import { Outlet, useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";

import { useCases } from "@/db/cases/hooks";
import CasesTable, { Patient } from "@/components/CasesTable/CasesTable";

import MainFlowAccordion, { AccordionItemType } from "@/components/MainFlowAccordion";
import casesService, { Batch } from "./casesService";
import { useEffect, useState } from "react";
import AppTabs, { Tab } from "@/components/layout/AppTabs";
import InsertionsView from "./InsertionsView";
import ExtractionsView from "./ExtractionsView";

// Create mock data based on the image

interface IProps {}

export default function DailyView() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("insertions");

  const handleTabChange = (tabId: string) => {
    console.log("Tab changed to:", tabId);
    navigate(`/daily-view/${tabId}`);
    setActiveTab(tabId);
  };

  const adminTabs: Tab[] = [
    {
      id: "insertions",
      component: InsertionsView,
      title: "Insertions",
      badge: 6,
    },
    {
      id: "extractions",
      component: ExtractionsView,
      title: "Extractions",
      badge: 3,
    },
  ];

  return (
    <main className="max-w-[1440px] mx-auto flex w-full mx-auto flex-col gap-4 mt-7">
      <AppTabs tabs={adminTabs} activeTabId={activeTab} onTabChange={handleTabChange}>
        <Outlet />
      </AppTabs>
    </main>
  );
}
