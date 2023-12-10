
  import { type Table } from "@tanstack/react-table"
  
  import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
  
  interface DataTablePaginationProps<TData> {
    table: Table<TData>
  }
  
  export function DataTablePagination<TData>({
    table,
  }: DataTablePaginationProps<TData>) {
    return (
      <div className="flex w-full flex-col items-center justify-end gap-4 overflow-auto px-2 py-1 sm:flex-row sm:gap-8">
        {/* <div className="flex-1 whitespace-nowrap text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div> */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
          <div className="flex items-center space-x-2">
            <p className="whitespace-nowrap text-sm font-medium">Rows per page</p>

          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              aria-label="Go to previous page"
              variant="outline"
              className="h-7 px-1"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <div className="inline pr-1 text-xs font-normal">
                <ChevronLeft className="inline w-3.5" />
                Prev
              </div>
            </Button>
            <Button
              aria-label="Go to next page"
              variant="outline"
              className="h-7 px-1"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <div className="inline pl-1 text-xs font-normal">
                Next
                <ChevronRight className="inline w-3.5" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    )
  }