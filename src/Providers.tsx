import { Outlet } from "react-router-dom";
import { SessionProvider } from "./context/SessionContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Providers = () => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <Outlet />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
