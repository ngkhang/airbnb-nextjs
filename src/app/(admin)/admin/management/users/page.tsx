'use client';

import { useQuery } from '@tanstack/react-query';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type PaginationState,
  type SortingState,
} from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import DrawerDialog from '@/components/drawer-dialog';
import { DataTablePagination } from '@/components/table/data-table-pagination';
import { DataTableViewOptions } from '@/components/table/data-table-view-options';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { queryKeys } from '@/constants/queryKeys';
import userService from '@/services/user.service';

import CreateUserForm from './_components/add-new-user';
import { columns } from './columns-users';

export default function ManagementUserPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 6,
  });
  const t = useTranslations();

  const { data: listUsers } = useQuery({
    queryKey: [queryKeys.user],
    queryFn: () => userService.getAll(),
  });

  const table = useReactTable({
    data: listUsers?.content || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      pagination,
    },
  });

  return (
    <div className='flex flex-1 flex-col gap-4 p-8 pt-0'>
      <div className='flex items-center justify-between'>
        <Input
          placeholder={t('ui.buttons.filterByName')}
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
        <div className='grid grid-flow-col gap-2'>
          <DrawerDialog
            title={t('ui.label.create', { name: 'user' })}
            button={{
              title: t('ui.buttons.add', { name: 'user' }),
              className: 'bg-chart-2 text-white hover:bg-chart-2/75',
            }}
          >
            <CreateUserForm />
          </DrawerDialog>
          <DataTableViewOptions table={table} />
        </div>
      </div>

      {/* Table */}
      <div className='overflow-hidden rounded-md border'>
        <Table className='text-center'>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className='w-fit text-center'>
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
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
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
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  {t('feedback.error.noResult')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <DataTablePagination table={table} />
    </div>
  );
}
