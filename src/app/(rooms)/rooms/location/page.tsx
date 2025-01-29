'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import Icon from '@/components/icons/icon';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { queryKeys } from '@/constants/queryKeys';
import ROUTES from '@/constants/routes';
import { formatCurrency } from '@/lib/utils';
import locationService from '@/services/location.service';
import roomService from '@/services/room.service';
import type { Location } from '@/types/location.type';

const keyMap = {
  room: ['khach', 'phongNgu', 'giuong', 'phongTam'],
} as const;

export default function LocationPage() {
  const searchParams = useSearchParams();
  const t = useTranslations();
  const locationId = searchParams.get('locationId') || 0;
  const { data: locations } = useQuery({
    queryKey: [queryKeys.location],
    queryFn: locationService.getAll,
  });

  const { data: rooms } = useQuery({
    queryKey: [queryKeys.room, locationId],
    queryFn: () => roomService.getByLocationId(locationId),
    enabled: !!locationId,
  });

  const locationInfo = (id: number, listLocation: Location[]): string => {
    const location = listLocation.find((item) => item.id === id);
    const keyLocation = ['tenViTri', 'tinhThanh', 'quocGia'] as const;

    if (location) {
      return keyLocation.map((item) => location[item]).join(' | ');
    }
    return '';
  };

  return (
    <div className='lg:pt-18 container grid grid-flow-col gap-4 pb-10 pt-4 lg:grid-cols-2 xl:grid-cols-5 xl:gap-6'>
      {/* List room by locationId */}
      <div className='col-span-full lg:col-span-1 xl:col-span-3'>
        <div className='mb-4'>
          <h3 className='font-semibold'>{`Over ${rooms?.content.length || 0} places`}</h3>
        </div>

        {rooms && (
          <div className='grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 xl:gap-10'>
            {rooms.content.map((room) => (
              <Card
                key={room.id}
                className='w-full rounded-none border-none p-0 shadow-none'
              >
                {/* Card Header */}
                <Link
                  href={ROUTES.ROOM.DETAIL(room.id)}
                  className='block overflow-hidden rounded-2xl'
                >
                  <CardHeader
                    className='relative mb-3 size-56 w-full rounded-2xl bg-left-bottom bg-no-repeat p-0 duration-300 hover:scale-125 hover:opacity-80 lg:size-64 lg:w-full'
                    style={{ backgroundImage: `url(${room.hinhAnh})` }}
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
                      href={ROUTES.ROOM.DETAIL(room.id)}
                      className='mr-2 truncate font-semibold capitalize text-[#222222]'
                    >
                      {room.tenPhong}
                    </Link>
                    <div className='flex items-center'>
                      <Icon
                        name='star'
                        size='20'
                        fill='#000'
                        className='mr-1'
                      />
                      <span>4.7</span>
                    </div>
                  </div>

                  {locations && (
                    <div className='mb-1 flex items-stretch space-x-2 text-sm text-[#6A6A6A]'>
                      <div className='flex h-5 items-center space-x-2 text-sm'>
                        {locationInfo(Number(locationId), locations.content)}
                      </div>
                    </div>
                  )}

                  <div className='mb-2 grid grid-cols-2 grid-rows-2 gap-1 text-sm text-[#6A6A6A]'>
                    {keyMap.room.map((item) => (
                      <span
                        key={item}
                      >{`· ${room[item]} ${t(`layout.rooms.${item}`)}`}</span>
                    ))}
                  </div>
                  <p className='mb-2 hidden truncate text-sm'>{room.moTa}</p>

                  <div className='flex items-center text-sm'>
                    <Icon className='size-5' name='vnd' />
                    {/* <Vnd /> */}
                    <span className='mr-1 text-lg font-semibold'>
                      {formatCurrency(+room.giaTien)}
                    </span>
                    <span>đêm</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Embed a map */}
      <div className='hidden lg:col-span-1 lg:block xl:col-span-2'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15676.573304912468!2d106.7122688!3d10.8003328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1734592326619!5m2!1sen!2s'
          width='80'
          height='100'
          className='size-full border-none'
          allowFullScreen={false}
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
        ></iframe>
      </div>
    </div>
  );
}
