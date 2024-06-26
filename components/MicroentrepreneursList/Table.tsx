import { flexRender, Table as ReactTable } from "@tanstack/react-table";

type TableProps<T> = {
  table: ReactTable<T>;
};

const Table = <T,>({ table }: TableProps<T>) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm text-left text-primary-500 dark:text-primary-400">
      <thead className="text-xs text-primary-700 uppercase bg-primary-50 dark:bg-primary-700 dark:text-primary-400">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="px-4 py-3">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="border-b dark:border-primary-700">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="px-4 py-3">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        {table.getFooterGroups().map((footerGroup) => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <th key={header.id} className="px-4 py-3">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  </div>
);

export default Table;
