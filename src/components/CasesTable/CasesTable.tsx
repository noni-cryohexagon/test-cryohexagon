import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender, getCoreRowModel, useReactTable, createColumnHelper } from "@tanstack/react-table";
import { Avatar } from "@/components/ui/avatar";
import SampleBadge from "./SampleBadge";

import { useEffect, useState } from "react";
import CaseProcessDialog from "./CaseProcessDialog";
import { Batch } from "@/pages/casesService";
import Badge from "./common/Badge";
import { useHideDailyView } from "@/pages/dailyViewAtom";

// Define the patient data type based on the image
export type Patient = {
  avatar: string;
  name: string;
  id: string;
  case_no: string;
  cpu_sc: string;
  partner: string | null;
  timer: string;
  embryos: number;
  oocytes: number;
  moreCount: number;
};

export default function CasesTable({ items, batches }: { items: Patient[]; batches: Batch[] }) {
  const [currentCaseId, setCurrentCaseId] = useState<string | null>(null);
  const { setDailyViewHidden } = useHideDailyView();

  useEffect(() => {
    setDailyViewHidden(!!currentCaseId);
  }, [currentCaseId]);

  const columnHelper = createColumnHelper<Patient>();

  const getSimpleCellValue = (accessorId: keyof Patient, label: string) => {
    return columnHelper.accessor(accessorId, {
      header: label,
      cell: (info) => info.getValue(),
    });
  };

  // Define columns
  const columns = [
    getSimpleCellValue("case_no", "Case No."),
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 rounded-full">
            <img src={`/mock/${info.row.original.avatar}`} alt={info.getValue()} />
          </Avatar>
          <span className="font-medium">{info.getValue()}</span>
        </div>
      ),
    }),
    getSimpleCellValue("hackId", "ID"),
    getSimpleCellValue("cpu_sc", "OPU / SC"),
    columnHelper.accessor("partner", {
      header: "Partner",
      cell: (info) => {
        const partner = info.getValue();
        return partner ? (
          <div className="flex items-center gap-2">
            <span>{partner}</span>
          </div>
        ) : (
          <span>-</span>
        );
      },
    }),
    columnHelper.accessor("timer", {
      header: "Timer",
      cell: (info) => {
        const timeArr = info.getValue().split(":");
        const hour =
          timeArr[0] > 0 ? (
            <>
              {timeArr[0]}
              <span className="text-gray-300">h</span>
            </>
          ) : null;
        const minute = (
          <>
            {timeArr[1]}
            <span className="text-gray-300">m</span>
          </>
        );
        return (
          <span className="text-sm text-gray-500">
            {hour} {minute}
          </span>
        );
      },
    }),
    columnHelper.accessor("embryos", {
      header: "Canes",
      cell: (info) => {
        const { embryos, oocytes, moreCount } = info.row.original;
        const sampleType = embryos > 0 ? "embryo" : oocytes > 0 ? "oocyte" : "sperm";
        const mapToBatch = {
          "4295715": [
            { amount: 5, isHighlighted: true },
            { amount: 7, isHighlighted: true },
            { amount: 3, isHighlighted: false },
          ],
          "9581156": [
            { amount: 3, isHighlighted: true },
            { amount: 4, isHighlighted: true },
            { amount: 1, isHighlighted: false },
          ],
          "4295714": [{ amount: 4, isHighlighted: false }],
          "1254547": [
            { amount: 2, isHighlighted: false },
            { amount: 3, isHighlighted: false },
          ],
          "6741922": [{ amount: 1, isHighlighted: false }],
        };
        const caseBatches = mapToBatch[info.row.original.case_no];
        // const caseNo = info.row.original.case_no;
        // const caseBatches = batches.filter((b) => b.caseId === caseNo);

        // const sampleType = caseBatches?.length > 0 ? caseBatches[0].sampleType : "unknown";

        if (info.row.original.case_no === "4295714") {
          return (
            <div className="flex items-center gap-2">
              <Badge type={sampleType} number={4} text={"Embryos"} />{" "}
              <span className="font-light text-gray-500 text-xs">to assign</span>
            </div>
          );
        }
        return (
          <div className="flex items-center gap-1">
            {caseBatches?.length > 0 && (
              <>
                <span className="mr-3 font-light capitalize text-sm">
                  {sampleType === "sperm" ? "sperm sample" : sampleType}s
                </span>
                {caseBatches.map((b, index) => (
                  <div key={index}>
                    {<SampleBadge type={sampleType} sample={`${b.amount}`} isHighlighted={b.isHighlighted} />}
                  </div>
                ))}
              </>
            )}
            {sampleType === "unknown" && <span className="text-gray-500">Loading...</span>}
          </div>
        );
      },
    }),
    // columnHelper.accessor("no-accessor", {
    //   header: "",
    //   cell: (info) => {
    //     return (
    //       <div className="flex items-center gap-2">
    //         <Button size="sm" onClick={() => setCurrentCaseId(info.row.original.id)}>
    //           Confirm batch
    //         </Button>
    //       </div>
    //     );
    //   },
    // }),
  ];

  // Initialize table
  const table = useReactTable({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="border-0">
      <Table className="w-full bg-white text-base">
        <TableHeader className="[&_tr]:border-b-0">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => (
                <TableHead className={`pr-6 ${index === 0 ? 'pl-15' : ''} text-gray-400 font-light`}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="border-t-1">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
                <TableRow
                  className="cursor-pointer"
                  key={row.id}
                  onClick={() => setCurrentCaseId(row.original.id)}
                >
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell className={`py-2 pr-6 ${index === 0 ? 'pl-15' : ''} font-light`} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No patients found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {currentCaseId && (
        <CaseProcessDialog
          caseId={currentCaseId}
          isOpen={!!currentCaseId}
          setIsOpen={(open) => {
            if (!open) setCurrentCaseId(null);
          }}
        />
      )}
    </div>
  );
}
