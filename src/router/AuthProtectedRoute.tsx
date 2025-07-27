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
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader>
          <SidebarTrigger className="-ml-1" />
        </AppHeader>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AuthProtectedRoute;
