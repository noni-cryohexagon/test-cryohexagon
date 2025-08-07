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

const style = {
  height: 30,
  width: 30,
};

export default function AppHeader({ children }: { children?: React.ReactNode }) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2  px-4">
      {children}
      <div className="max-w-[1440px] mx-auto flex-1 ">
        <div
          className="mx-10 flex items-center justify-between "
          style={{ backgroundColor: "#dddddd", padding: "8px 20px", borderRadius: "22px" }}
        >
          <div className="font-bold  text-lg flex items-center gap-2">
            {/* <img src={HexaConfIcon} alt="HexaConf Logo" className="" style={style} /> */}
            cryohexagon
          </div>

          <div className="flex items-center gap-2">
            <img src={orgLogo} alt="Logo" className="" style={style} />
            <img src={userLogo} alt="User Logo" className="" style={style} />
          </div>
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
