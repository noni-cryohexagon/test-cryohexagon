import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import CaseEditor from "./CaseEditor";

interface IProps {
  caseId: string;
  title: string;
  desc: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function PrepareCaseDialog({ caseId, title, desc, isOpen, setIsOpen }: IProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="min-w-350 overflow-hidden p-0">
        <DialogHeader className="">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{desc}</DialogDescription>
          <CaseEditor caseId={caseId} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
