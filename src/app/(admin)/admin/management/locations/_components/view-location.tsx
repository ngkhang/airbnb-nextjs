'use client';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import Icon from '@/components/icons/icon';
import Spinner from '@/components/icons/spinner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { queryKeys } from '@/constants/queryKeys';
import locationService from '@/services/location.service';

const keyMap = {
  profileLocation: {
    fields: ['tenViTri', 'tinhThanh', 'quocGia'],
  },
} as const;

export default function ViewLocationDetail({
  locationId,
}: {
  locationId: string | number;
}) {
  const { data: locationInfo, isPending } = useQuery({
    queryKey: [queryKeys.location, locationId],
    queryFn: () => locationService.getById(locationId),
    enabled: !!locationId,
  });

  const t = useTranslations();

  if (isPending) {
    return (
      <div className='display-center py-8'>
        <Spinner className='text-brand' size='lg' />
      </div>
    );
  }

  return (
    <div>
      {locationInfo && (
        <div className='grid gap-2 lg:grid-cols-2'>
          <div className='lg:col-span-1'>
            {keyMap.profileLocation.fields.map((key, index) => (
              <div key={key} className='font-medium'>
                {index !== 0 && <Separator className='my-5' />}
                <p className='mb-1'>
                  {t(`pages.location.fields.${key}.title`)}
                </p>
                <p className='text-muted-foreground'>
                  {locationInfo.content[key] ||
                    t(`pages.location.fields.${key}.textEmpty`)}
                </p>
              </div>
            ))}
          </div>

          <div className='lg:col-span-1'>
            <Avatar className='aspect-square size-full rounded object-cover lg:mx-auto'>
              <AvatarImage
                src={locationInfo.content.hinhAnh || ''}
                alt={locationInfo.content.tenViTri}
              />
              <AvatarFallback className='rounded'>
                <Icon name='imageOff' size='20' />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      )}
    </div>
  );
}
