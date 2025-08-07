import NotFoundPage from "../pages/404Page";
import { useSession } from "../context/SessionContext";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Outlet } from "react-router-dom";

import AppHeader from "@/components/layout/AppHeader";

const AuthProtectedRoute = () => {
  const { session } = useSession();
  if (!session) {
    return <NotFoundPage />;
  }
  return (
    <SidebarProvider className="p-0 m-0 md:peer-data-[variant=inset]:m-0">
      <AppSidebar />
      <SidebarInset className="p-0 m-0 md:peer-data-[variant=inset]:m-0 md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-0 md:peer-data-[variant=inset]:rounded-none">
        <AppHeader>{/* <SidebarTrigger className="-ml-1" /> */}</AppHeader>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AuthProtectedRoute;
