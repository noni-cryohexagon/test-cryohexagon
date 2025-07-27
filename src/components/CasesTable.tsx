
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Define the patient data type based on the image
type Patient = {
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


export default function CasesTable({cases}: {cases: Patient[]}) {
  // Create column helper
  const columnHelper = createColumnHelper<Patient>();
  
  // Define columns
  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 rounded-full">
            <img src={info.row.original.avatar} alt={info.getValue()} />
          </Avatar>
          <span>{info.getValue()}</span>
        </div>
      ),
    }),
    columnHelper.accessor("id", {
      header: "ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("case_no", {
      header: "Case No.",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("cpu_sc", {
      header: "CPU / SC",
      cell: (info) => info.getValue(),
    }),
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
    columnHelper.accessor("timer", {
      header: "Timer",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("embryos", {
      header: "Batches",
      cell: (info) => {
        const { embryos, oocytes, moreCount } = info.row.original;
        return (
          <div className="flex items-center gap-2">
            {embryos > 0 && (
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                <span className="mr-1">🥚</span> {embryos} embryo
              </Badge>
            )}
            {oocytes > 0 && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <span className="mr-1">🔵</span> {oocytes} oocytes
              </Badge>
            )}
            {moreCount > 0 && (
              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                {moreCount} more...
              </Badge>
            )}
          </div>
        );
      },
    }),
  ];
  
            // Initialize table
            const table = useReactTable({
                data: cases,
                columns,
                getCoreRowModel: getCoreRowModel(),
  });

  return (          
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
      </div>
  );
}
