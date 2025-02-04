import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import ROUTES from '@/constants/routes';
import { useUserStore } from '@/stores/userStore';

export default function NavHeaderAdmin() {
  const t = useTranslations();
  const { user } = useUserStore();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link href={ROUTES.ADMIN.DASHBOARD}>
          <SidebarMenuButton
            size='lg'
            className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
          >
            <Avatar className='h-8 w-8 rounded-lg'>
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className='rounded-lg'>CN</AvatarFallback>
            </Avatar>
            <div className='grid flex-1 text-left text-sm leading-tight'>
              <span className='truncate font-semibold'>
                {t('pages.admin.shared.sidebar.navHeader.title')}
              </span>
              <span className='truncate text-xs'>
                {t('pages.admin.shared.sidebar.navHeader.description')}
              </span>
            </div>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
