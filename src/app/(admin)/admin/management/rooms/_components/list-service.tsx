import type { Row } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import React from 'react';

import type { Room } from '@/types/room.type';
const keyMap = {
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

export default function ListServiceRoom({
  roomService,
}: {
  roomService: Row<Room>;
}) {
  const t = useTranslations();

  return (
    <p className=''>
      {keyMap.equipments.reduce((pre, value, index) => {
        const isValid =
          roomService.original[value as keyof typeof roomService.original];
        if (isValid)
          pre +=
            keyMap.equipments.length - 1 === index
              ? t(`common.equipments.${value}`)
              : `${t(`common.equipments.${value}`)}, `;
        return pre;
      }, '')}
    </p>
  );
}
