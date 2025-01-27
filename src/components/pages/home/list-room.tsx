'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

import Icon from '@/components/icons/icon';
import Spinner from '@/components/icons/spinner';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { queryKeys } from '@/constants/queryKeys';
import ROUTES from '@/constants/routes';
import { formatCurrency } from '@/lib/utils';
import locationService from '@/services/location.service';
import roomService from '@/services/room.service';
import type { Location } from '@/types/location.type';

const keyMap = {
  room: ['khach', 'phongNgu', 'giuong', 'phongTam'],
} as const;

export default function ListRoom() {
  const t = useTranslations();

  const { data: locations } = useQuery({
    queryKey: [queryKeys.location],
    queryFn: locationService.getAll,
  });

  const locationInfo = (id: number, listLocation: Location[]): string => {
    const location = listLocation.find((item) => item.id === id);
    const keyLocation = ['tenViTri', 'tinhThanh', 'quocGia'] as const;

    if (location) {
      return keyLocation.map((item) => location[item]).join(' | ');
    }
    return '';
  };
  const {
    isPending,
    isError,
    data: rooms,
    error,
  } = useQuery({
    queryKey: [queryKeys.room],
    queryFn: roomService.getAll,
  });

  if (isPending) {
    return (
      <div className='display-center bg-pink-50 py-8'>
        <Spinner className='text-brand' size='lg' />
      </div>
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className='grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-10 xl:grid-cols-4 xl:gap-8 3xl:grid-cols-5 4xl:grid-cols-6'>
      {rooms.content.map((item) => (
        <Card
          key={item.id}
          className='w-full rounded-none border-none p-0 shadow-none'
        >
          {/* Card Header */}
          <Link
            href={ROUTES.ROOM.DETAIL(item.id)}
            className='block overflow-hidden rounded-2xl'
          >
            <CardHeader
              className='relative mb-3 size-56 w-full rounded-2xl bg-left-bottom bg-no-repeat p-0 duration-300 hover:scale-125 hover:opacity-80 lg:size-64 lg:w-full'
              style={{ backgroundImage: `url(${item.hinhAnh})` }}
            >
              <Icon
                name='heart'
                color='#fff'
                className='absolute right-3 top-3 fill-black/50 hover:scale-125'
              />
            </CardHeader>
          </Link>

          {/* Card content */}
          <CardContent className='p-0'>
            <div className='mb-2 flex items-center justify-between text-[#6A6A6A]'>
              <Link
                href={ROUTES.ROOM.DETAIL(item.id)}
                className='mr-2 truncate font-semibold capitalize text-[#222222]'
              >
                {item.tenPhong}
              </Link>
              <div className='flex items-center'>
                <Icon name='star' size='20' fill='#000' className='mr-1' />
                <span>4.7</span>
              </div>
            </div>

            {locations && (
              <div className='mb-1 flex items-stretch space-x-2 text-sm text-[#6A6A6A]'>
                <div className='flex h-5 items-center space-x-2 text-sm'>
                  {locationInfo(item.maViTri, locations.content)}
                </div>
              </div>
            )}

            <div className='mb-2 grid grid-cols-2 grid-rows-2 gap-1 text-sm text-[#6A6A6A]'>
              {keyMap.room.map((roomInfo) => (
                <span key={roomInfo}>
                  {`· ${item[roomInfo]} ${t(`layout.rooms.${roomInfo}`)}`}
                </span>
              ))}
            </div>
            <p className='mb-2 hidden truncate text-sm'>{item.moTa}</p>

            <div className='flex items-center text-sm'>
              <Icon name='vnd' className='size-5' />
              <span className='mr-1 text-lg font-semibold'>
                {formatCurrency(+item.giaTien)}
              </span>
              <span>đêm</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
