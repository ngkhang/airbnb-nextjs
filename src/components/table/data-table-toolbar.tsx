import { DataTableViewOptions } from './data-table-view-options';
import { DataTableToolbarProps } from './table.type';

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <div className='flex items-center justify-between'>
      <DataTableViewOptions table={table} />
    </div>
  );
}
