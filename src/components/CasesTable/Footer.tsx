import DialogText from "./common/DialogText";
import { useFooter } from "./footerAtom2";

export interface FooterProps {
  stepNum: number;
  totalSteps: number;
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  // export default function Footer({ stepNum, totalSteps, title, description, children, className }: FooterProps) {
  const { value: footerValue } = useFooter();

  return (
    <div className={`bg-white px-14 py-6 flex items-center justify-between rounded-2xl ${className}`}>
      <div className="flex items-center">
        <DialogText className="mr-4 text-2xl font-light text-indigo-200">
          <span className="text-black">{footerValue.stepNum}</span>/{footerValue.totalSteps}
        </DialogText>
        <DialogText className="text-lg font-light ">{footerValue.title}</DialogText>
        <DialogText className="ml-5 font-light text-lg text-[#807E7E]">{footerValue.description}</DialogText>
      </div>
      <div className="flex items-center">{footerValue.children}</div>
    </div>
  );
}
