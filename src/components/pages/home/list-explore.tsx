'use client';

import { useQuery } from '@tanstack/react-query';
import isUrl from 'is-url';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import Icon from '@/components/icons/icon';
import Spinner from '@/components/icons/spinner';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { queryKeys } from '@/constants/queryKeys';
import ROUTES from '@/constants/routes';
import locationService from '@/services/location.service';

export default function ListExplore() {
  const t = useTranslations('pages.home.explore');
  const {
    isPending,
    isError,
    data: locations,
    error,
  } = useQuery({
    queryKey: [queryKeys.location],
    queryFn: locationService.getAll,
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
    <div>
      <div className='mb-4'>
        <h3 className='mb-2 text-3xl font-bold text-[#222222]'>{t('title')}</h3>
        <p className='text-base text-[#6A6A6A]'>{t('description')}</p>
      </div>

      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5 xl:grid-cols-6'>
        {locations.content &&
          locations.content.map((item) => (
            <Link key={item.id} href={ROUTES.ROOM.LOCATION(item.id)}>
              <Card className='grid h-full w-full grid-cols-5 justify-items-start gap-2 border-none shadow-none'>
                <CardHeader className='col-span-2 col-start-1 overflow-hidden rounded-2xl p-0'>
                  {isUrl(item.hinhAnh) ? (
                    <Image
                      loading='lazy'
                      width={50}
                      height={50}
                      src={item.hinhAnh}
                      alt={item.tenViTri}
                      className='aspect-square size-full rounded-2xl hover:scale-110'
                      quality={75}
                    />
                  ) : (
                    <div className='center aspect-square size-full rounded-2xl bg-[#EEEEEE]'>
                      <Icon name='imageOff' size='30' />
                    </div>
                  )}
                </CardHeader>
                <CardContent className='center col-span-3 col-start-3 p-0'>
                  <div className='text-sm'>
                    <p className='font-semibold'>{item.tenViTri}</p>
                    <p className='text-xs text-[#6A6A6A]'>{`${item.tinhThanh}, ${item.quocGia}`}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        {locations.content &&
          locations.content.map((item) => (
            <Link key={item.id} href={ROUTES.ROOM.LOCATION(item.id)}>
              <Card className='grid h-full w-full grid-cols-5 justify-items-start gap-2 border-none shadow-none'>
                <CardHeader className='col-span-2 col-start-1 overflow-hidden rounded-2xl p-0'>
                  {isUrl(item.hinhAnh) ? (
                    <Image
                      loading='lazy'
                      width={50}
                      height={50}
                      src={item.hinhAnh}
                      alt={item.tenViTri}
                      className='aspect-square size-full rounded-2xl hover:scale-110'
                      quality={75}
                    />
                  ) : (
                    <div className='center aspect-square size-full rounded-2xl bg-[#EEEEEE]'>
                      <Icon name='imageOff' size='30' />
                    </div>
                  )}
                </CardHeader>
                <CardContent className='center col-span-3 col-start-3 p-0'>
                  <div className='text-sm'>
                    <p className='font-semibold'>{item.tenViTri}</p>
                    <p className='text-xs text-[#6A6A6A]'>{`${item.tinhThanh}, ${item.quocGia}`}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
      </div>
    </div>
  );
}
