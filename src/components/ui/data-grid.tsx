"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Download, Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

interface DataGridProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string; // Key to filter by (usually 'name' or 'title')
  searchPlaceholder?: string;
  onAdd?: () => void;
  addLabel?: string;
  enableViewToggle?: boolean; // List vs Grid (future)
}

export function DataGrid<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Pesquisar...",
  onAdd,
  addLabel = "Adicionar",
}: DataGridProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="space-y-4">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
             <div className="relative w-full md:w-72">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-diamond-muted" />
                 <Input
                    placeholder={searchPlaceholder}
                    value={(table.getColumn(searchKey || "")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn(searchKey || "")?.setFilterValue(event.target.value)
                    }
                    className="pl-9 h-10 bg-onyx-900 border-white/10"
                />
             </div>
             
             <div className="flex items-center gap-2 w-full md:w-auto">
                 <Button variant="outline" size="sm" className="h-10 gap-2 text-diamond-muted border-white/10 hover:text-white">
                    <SlidersHorizontal size={16} />
                    Filtros
                 </Button>
                 <Button variant="outline" size="sm" className="h-10 gap-2 text-diamond-muted border-white/10 hover:text-white">
                    <Download size={16} />
                    Exportar
                 </Button>
                 {onAdd && (
                     <Button onClick={onAdd} size="sm" className="h-10 ml-auto md:ml-2 btn-primary">
                        {addLabel}
                     </Button>
                 )}
             </div>
        </div>

        {/* Table */}
      <div className="rounded-md border border-white/5 overflow-hidden bg-onyx-900/40">
        <Table>
          <TableHeader className="bg-onyx-950">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-white/5 hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-diamond-muted font-medium text-xs uppercase tracking-wider h-12">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-white/5 hover:bg-white/5 transition-colors data-[state=selected]:bg-gold/10"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3 text-sm text-diamond/90">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-diamond-muted">
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
            <div className="text-xs text-diamond-muted">
                {table.getFilteredSelectedRowModel().rows.length} de {table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
            </div>
            <div className="flex items-center space-x-2">
                <div className="hidden md:flex items-center gap-2 mr-4">
                     <span className="text-xs text-diamond-muted">Linhas por página</span>
                     <Select
                         value={`${table.getState().pagination.pageSize}`}
                         onValueChange={(value) => {
                             table.setPageSize(Number(value))
                         }}
                     >
                        <SelectTrigger className="h-8 w-[70px] bg-onyx-900 border-white/10 text-xs">
                            <SelectValue placeholder={table.getState().pagination.pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                     </Select>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="h-8 w-8 p-0 border-white/10 bg-onyx-900"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="text-xs text-white">
                    Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="h-8 w-8 p-0 border-white/10 bg-onyx-900"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
      </div>
    </div>
  );
}
