'use client';

import { useQuery } from '@tanstack/react-query';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
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
import roomService from '@/services/room.service';

import CreateRoomForm from './_components/add-new-room';
import { columns } from './columns-rooms';

export default function ManagementRoomPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 6,
  });

  const t = useTranslations();

  const { data: listRooms } = useQuery({
    queryKey: [queryKeys.room],
    queryFn: () => roomService.getAll(),
  });

  const table = useReactTable({
    data: listRooms?.content || [],
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
          value={
            (table.getColumn('tenPhong')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('tenPhong')?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
        <div className='grid grid-flow-col gap-2'>
          <DrawerDialog
            title={t('ui.label.create', { name: 'room' })}
            button={{
              title: t('ui.buttons.add', { name: 'room' }),
              className: 'bg-chart-2 text-white hover:bg-chart-2/75',
            }}
            width='lg:max-w-[650px]'
          >
            <CreateRoomForm />
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
                  No results.
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
