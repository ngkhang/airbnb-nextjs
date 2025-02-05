'use client';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import Icon from '@/components/icons/icon';
import Spinner from '@/components/icons/spinner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { queryKeys } from '@/constants/queryKeys';
import { cn, formatCurrency } from '@/lib/utils';
import roomService from '@/services/room.service';

const keyMap = {
  room: ['tenPhong', 'moTa', 'giaTien', 'khach'],
  equipments: [
    'mayGiat',
    'banLa',
    'tivi',
    'dieuHoa',
    'wifi',
    'bep',
    'doXe',
    'hoBoi',
    'banUi',
  ],
} as const;

export default function ViewRoomDetail({
  roomId,
}: {
  roomId: string | number;
}) {
  const { data: roomInfo, isPending } = useQuery({
    queryKey: [queryKeys.room, roomId],
    queryFn: () => roomService.getByRoomId(roomId),
    enabled: !!roomId,
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
      {roomInfo && (
        <div className='grid gap-2 lg:grid-cols-3'>
          <div className='grid grid-cols-2 gap-2 lg:col-span-2'>
            {keyMap.room.map((key, index) => (
              <div
                key={key}
                className={cn(
                  'font-medium',
                  ['tenPhong', 'moTa'].includes(key)
                    ? 'col-span-2'
                    : 'col-span-1'
                )}
              >
                {index !== 0 && <Separator className='my-5' />}
                <p className='mb-1'>{t(`pages.room.details.${key}`)}</p>
                {key === 'giaTien' ? (
                  <p className='flex items-center text-muted-foreground'>
                    <Icon name='vnd' size={14} />
                    {formatCurrency(roomInfo.content[key]) ||
                      t('common.textEmpty')}
                  </p>
                ) : (
                  <p className='text-muted-foreground'>
                    {roomInfo.content[key] || t('common.textEmpty')}
                  </p>
                )}
              </div>
            ))}

            <Separator className='col-span-1 my-5 lg:col-span-2' />

            <div className='col-span-2'>
              <p className=''>
                {keyMap.equipments.reduce((pre, value, index) => {
                  const isValid = roomInfo.content[value];
                  if (isValid)
                    pre +=
                      keyMap.equipments.length - 1 === index
                        ? t(`common.equipments.${value}`)
                        : `${t(`common.equipments.${value}`)}, `;
                  return pre;
                }, '')}
              </p>
            </div>
          </div>

          <div className='lg:col-span-1'>
            <Avatar className='aspect-square size-full rounded object-cover lg:mx-auto'>
              <AvatarImage
                src={roomInfo.content.hinhAnh || ''}
                alt={roomInfo.content.tenPhong}
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
