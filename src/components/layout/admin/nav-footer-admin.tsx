'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import Icon from '@/components/icons/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import ROUTES from '@/constants/routes';
import { handleErrorApi } from '@/lib/utils';
import authService from '@/services/auth.service';
import { useUserStore } from '@/stores/userStore';
import { User } from '@/types/user.type';

interface NavFooterAdminProps {
  account: User;
}

export default function NavFooterAdmin({ account }: NavFooterAdminProps) {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const { deleteUser } = useUserStore();
  const t = useTranslations();

  const handleLogout = async () => {
    try {
      // Delete token and role user in cookie
      await authService.logoutNextServer();
      // Delete user info in local storage
      deleteUser();
      // Direct to home page
      router.push(ROUTES.HOME);
      router.refresh();
    } catch (error) {
      handleErrorApi(error);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarImage src={account.avatar || ''} alt={account.name} />
                <AvatarFallback className='rounded-lg'>CN</AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>{account.name}</span>
                <span className='truncate text-xs'>{account.email}</span>
              </div>
              <Icon name='chevronsUpDown' size={20} />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Icon name='badgeCheck' />
                {/* TODO: Add link direct view profile */}
                {t('ui.buttons.account')}
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Icon name='bell' />
                {t('ui.label.notifications')}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <Icon name='logOut' />
              {t('ui.buttons.logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
