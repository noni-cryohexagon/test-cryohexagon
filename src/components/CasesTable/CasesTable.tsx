import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender, getCoreRowModel, useReactTable, createColumnHelper } from "@tanstack/react-table";
import { Avatar } from "@/components/ui/avatar";
import SampleBadge from "./SampleBadge";

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

export default function CasesTable({ items }: { items: Patient[] }) {
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
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 rounded-full">
            <img src={info.row.original.avatar} alt={info.getValue()} />
          </Avatar>
          <span className="font-semibold">{info.getValue()}</span>
        </div>
      ),
    }),
    getSimpleCellValue("id", "ID"),
    getSimpleCellValue("case_no", "Case No."),
    getSimpleCellValue("cpu_sc", "CPU / SC"),
    columnHelper.accessor("partner", {
      header: "Partner",
      cell: (info) => {
        const partner = info.getValue();
        return partner ? (
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6 rounded-full bg-gray-300">
              <span className="text-xs">P</span>
            </Avatar>
            <span>{partner}</span>
          </div>
        ) : (
          <span>-</span>
        );
      },
    }),
    getSimpleCellValue("timer", "Timer"),
    columnHelper.accessor("embryos", {
      header: "Batches",
      cell: (info) => {
        const { embryos, oocytes, moreCount } = info.row.original;
        return (
          <div className="flex items-center gap-2">
            {embryos > 0 && <SampleBadge sample={`${embryos}`} color="yellow" />}
            {oocytes > 0 && <SampleBadge sample={`${oocytes}`} color="blue" />}
            {moreCount > 0 && <SampleBadge sample={`${moreCount}`} color="gray" />}
          </div>
        );
      },
    }),
  ];

  // Initialize table
  const table = useReactTable({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="border-0">
      <Table>
        <TableHeader className="[&_tr]:border-b-0">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                // <div className="mt-8" key={header.id}>
                <TableHead className=" text-gray-400 text-sm font-light">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
                // </div>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow className="border-0" key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
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
    </div>
  );
}
