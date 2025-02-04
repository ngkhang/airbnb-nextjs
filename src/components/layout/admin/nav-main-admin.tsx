'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import Icon from '@/components/icons/icon';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import ROUTES from '@/constants/routes';

const keyMap = {
  navMain: {
    key: ['users', 'rooms', 'locations'],
    map: {
      users: {
        icon: 'users',
        route: 'USERS',
      },
      rooms: {
        icon: 'mapPinHouse',
        route: 'ROOMS',
      },
      locations: {
        icon: 'mapPinned',
        route: 'LOCATIONS',
      },
    },
  },
} as const;

export default function NavMainAdmin() {
  const t = useTranslations();

  return (
    <SidebarMenu className='grid gap-2'>
      {keyMap.navMain.key.map((key) => (
        <SidebarMenuItem key={key} className='px-1'>
          <SidebarMenuButton asChild className='px-4'>
            <Link href={ROUTES.ADMIN[keyMap.navMain.map[key].route]}>
              <Icon name={keyMap.navMain.map[key].icon} />
              <span>{t(`pages.admin.shared.sidebar.navMain.${key}`)}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
