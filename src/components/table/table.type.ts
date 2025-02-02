import type { Column, ColumnDef, Row, Table } from '@tanstack/react-table';

import type { IconName } from '../icons/icon';

export interface TableBase<TData> {
  table: Table<TData>;
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filter?: {
    key: string;
    title: string;
  };
}

export interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  iconName: IconName;
  sizeIcon?: string | number;
}

export interface DateTableColumnCellProps<TData>
  extends React.HTMLAttributes<HTMLDivElement> {
  row: Row<TData>;
  accessorKey: string;
}

export interface DataTableToolbarProps<TData> extends TableBase<TData> {}
export interface DataTableViewOptionsProps<TData> extends TableBase<TData> {}
export interface DataTablePaginationProps<TData> extends TableBase<TData> {}
