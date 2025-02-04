'use client';

import { type ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import Icon from '@/components/icons/icon';
import { DataTableColumnHeaderProps } from '@/components/table/table.type';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { User } from '@/types/user.type';

import ButtonAction from './_components/button-action';

export const columns: ColumnDef<User>[] = [
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
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Full name'
        iconName='arrowUpDown'
      />
    ),
    cell: ({ row }) => <span>{row.original.name}</span>,
  },
  {
    accessorKey: 'email',
    header: 'Contact info',
    cell: ({ row }) => (
      <div className='flex flex-col items-start'>
        <span className='mb-2 font-semibold'>{row.original.email}</span>
        {row.original.phone && (
          <span className='text-sm text-muted-foreground'>{`${row.original.phone.slice(0, -4)}${'*'.repeat(4)}`}</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: 'birthday',
    header: 'Birthday',
    cell: ({ row }) => {
      const date = row.original.birthday;
      if (date && new Date(date).toString() !== 'Invalid Date') {
        const formatted = format(date, 'dd/MM/yyyy');
        return <span>{formatted}</span>;
      }
    },
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
    cell: ({ row }) => <span>{row.original.gender ? 'Male' : 'Female'}</span>,
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Role'
        iconName='arrowUpDown'
      />
    ),
    cell: ({ row }) => <span>{row.original.role}</span>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: () => (
      <span
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'border-chart-2 px-2 py-1 text-xs text-chart-2'
        )}
      >
        Active
      </span>
    ),
  },
  {
    accessorKey: 'action',
    header: '',
    cell: ({ row }) => <ButtonAction userId={row.original.id} />,
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
