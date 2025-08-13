import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender, getCoreRowModel, useReactTable, createColumnHelper } from "@tanstack/react-table";
import { Avatar } from "@/components/ui/avatar";
import SampleBadge from "./SampleBadge";

import { useState } from "react";
import CaseProcessDialog from "./CaseProcessDialog";
import { Batch } from "@/pages/casesService";

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
  // Create column helper
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
    getSimpleCellValue("timer", "Timer"),
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
      header: "Batches",
      cell: (info) => {
        const { embryos, oocytes, moreCount } = info.row.original;

        const caseNo = info.row.original.case_no;
        const caseBatches = batches.filter((b) => b.caseId === caseNo);

        const sampleType = caseBatches?.length > 0 ? caseBatches[0].sampleType : "unknown";
        return (
          <div className="flex items-center gap-1">
            {caseBatches?.length > 0 && (
              <>
                <SampleBadge type={sampleType} />
                {caseBatches.map((b) => (
                  <div key={b.id}>{<SampleBadge type={sampleType} sample={`${b.numberOfSamples}`} />}</div>
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
      <Table className="w-full bg-white">
        <TableHeader className="[&_tr]:border-b-0">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                // <div className="mt-8" key={header.id}>
                <TableHead className="px-6 text-gray-400 text-sm font-light">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
                // </div>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="border-t-1">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow className=" cursor-pointer" key={row.id} onClick={() => setCurrentCaseId(row.original.id)}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell className="py-2 px-6" key={cell.id}>
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
