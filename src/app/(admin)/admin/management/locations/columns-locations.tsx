'use client';

import { type ColumnDef } from '@tanstack/react-table';

import Icon from '@/components/icons/icon';
import { DataTableColumnHeaderProps } from '@/components/table/table.type';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import type { Location } from '@/types/location.type';

import ButtonAction from './_components/button-action';

export const columns: ColumnDef<Location>[] = [
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
    accessorKey: 'hinhAnh',
    header: 'Image',
    cell: ({ row }) => (
      <Avatar className='mx-auto aspect-square size-20 rounded object-cover'>
        <AvatarImage
          src={row.original.hinhAnh || ''}
          alt={row.original.tenViTri}
        />
        <AvatarFallback className='rounded'>
          <Icon name='imageOff' size='20' />
        </AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: 'tenViTri',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Location'
        iconName='arrowUpDown'
      />
    ),
    cell: ({ row }) => <span>{row.original.tenViTri}</span>,
  },
  {
    accessorKey: 'tinhThanh',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Provide'
        iconName='arrowUpDown'
      />
    ),
    cell: ({ row }) => <span>{row.original.tinhThanh}</span>,
  },
  {
    accessorKey: 'quocGia',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Nation'
        iconName='arrowUpDown'
      />
    ),
    cell: ({ row }) => <span>{row.original.quocGia}</span>,
  },
  {
    accessorKey: 'action',
    header: '',
    cell: ({ row }) => <ButtonAction locationId={row.original.id} />,
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
