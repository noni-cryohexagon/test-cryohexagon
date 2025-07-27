// import { Separator } from "@radix-ui/react-separator";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
import orgLogo from "./org-logo.png";
import userLogo from "./user-logo.png";
import HexaConfIcon from "./hexa-conf-icon.png";

export default function AppHeader({ children }: { children?: React.ReactNode }) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      {children}
      <div className="flex-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={orgLogo} alt="Logo" className="h-8 w-8" />
          <img src={userLogo} alt="User Logo" className="h-8 w-8" />
          <div className="flex items-center gap-2">Elad Magen</div>
        </div>
        <div className="">
          <img src={HexaConfIcon} alt="HexaConf Logo" className="h-8 w-8" />
        </div>
      </div>
    </header>
    // <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
    //   {children}
    //   <Separator orientation="vertical" className="mr-2 h-4" />
    //   <Breadcrumb>
    //     <BreadcrumbList>
    //       <BreadcrumbItem className="hidden md:block">
    //         <BreadcrumbLink href="#">
    //           Building Your Application
    //         </BreadcrumbLink>
    //       </BreadcrumbItem>
    //       <BreadcrumbSeparator className="hidden md:block" />
    //       <BreadcrumbItem>
    //         <BreadcrumbPage>Data Fetching</BreadcrumbPage>
    //       </BreadcrumbItem>
    //     </BreadcrumbList>
    //   </Breadcrumb>
    // </header>
  );
}
