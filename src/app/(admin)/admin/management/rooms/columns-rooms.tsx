'use client';

import { type ColumnDef } from '@tanstack/react-table';

import Icon from '@/components/icons/icon';
import { DataTableColumnHeaderProps } from '@/components/table/table.type';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import type { Room } from '@/types/room.type';

import ButtonAction from './_components/button-action';
import ListServiceRoom from './_components/list-service';

export const columns: ColumnDef<Room>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='ID'
        iconName='arrowUpDown'
      />
    ),
    cell: ({ row }) => <span>{row.original.id}</span>,
    enableResizing: false,
  },
  {
    accessorKey: 'tenPhong',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Room name'
        iconName='arrowUpDown'
      />
    ),
    cell: ({ row }) => <span>{row.original.tenPhong}</span>,
  },
  {
    accessorKey: 'giaTien',
    header: 'Price',
    cell: ({ row }) => <span>{formatCurrency(row.original.giaTien)}</span>,
  },
  {
    accessorKey: 'khach',
    header: 'Guests',
    cell: ({ row }) => <span>{row.original.khach}</span>,
  },
  {
    accessorKey: 'info',
    header: 'Info',
    cell: ({ row }) => (
      <ul className='grid gap-2'>
        <li>Phòng ngủ: {row.original.phongNgu}</li>
        <li>Phòng tắm: {row.original.phongTam}</li>
        <li>Giường: {row.original.giuong}</li>
      </ul>
    ),
  },
  {
    accessorKey: 'service',
    header: 'Service',
    cell: ({ row }) => <ListServiceRoom roomService={row} />,
  },
  {
    accessorKey: 'action',
    header: '',
    cell: ({ row }) => <ButtonAction roomId={row.original.id} />,
  },
];

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  iconName,
  sizeIcon = 20,
}: DataTableColumnHeaderProps<TData, TValue>) {
  return (
    <Button
      variant='ghost'
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {title}
      <Icon size={sizeIcon} name={iconName} className='ml-2' />
    </Button>
  );
}
