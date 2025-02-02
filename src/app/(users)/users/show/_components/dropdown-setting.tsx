'use client';

import type { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import Icon from '@/components/icons/icon';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ROUTES from '@/constants/routes';
import { handleErrorApi } from '@/lib/utils';
import authService from '@/services/auth.service';
import { useUserStore } from '@/stores/userStore';

const keyMap = {
  accountSettings: {
    group1: {
      key: ['PROFILE', 'RESERVATION_HISTORY', 'ACCOUNT_SETTINGS'],
      icon: {
        PROFILE: 'user',
        RESERVATION_HISTORY: 'creditCard',
        ACCOUNT_SETTINGS: 'settings',
      },
    },
    group2: {
      key: ['invite', 'globalPreferences', 'help'],
      icon: {
        invite: '',
        globalPreferences: '',
        help: '',
      },
    },
  },
} as const;

export function DropdownSettingsUser(props: DropdownMenuContentProps) {
  const router = useRouter();
  const { user, deleteUser } = useUserStore();
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='font-medium text-[#008489]'>
          {t('pages.user.shared.accountSettings.title')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56 p-3' side='bottom' {...props}>
        <DropdownMenuLabel>
          <Link
            className='flex items-center gap-2 py-1'
            href={ROUTES.USER.DASHBOARD}
          >
            <Icon size={18} name='badgeCheck' />
            <span className='flex-1'>
              {t('pages.user.shared.accountSettings.top')}
            </span>
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {keyMap.accountSettings.group1.key.map((key) => (
            <DropdownMenuItem
              className='focus:text-inherit'
              key={key}
              disabled={false}
            >
              <Link
                className='flex w-full items-center gap-2 py-1'
                href={ROUTES.USER[key]}
              >
                <Icon
                  size={18}
                  name={keyMap.accountSettings.group1.icon[key]}
                />
                <span className='flex-1'>
                  {t(`pages.user.shared.accountSettings.middle.group1.${key}`)}
                </span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuGroup>
          {keyMap.accountSettings.group2.key.map((key) => (
            <DropdownMenuItem
              className='focus:text-inherit'
              key={key}
              disabled={true}
            >
              <Link
                className='flex w-full items-center gap-2 py-1'
                href={ROUTES.HOME}
              >
                {keyMap.accountSettings.group2.icon[key] !== '' && (
                  <Icon
                    size={18}
                    name={keyMap.accountSettings.group2.icon[key]}
                  />
                )}
                <span className='flex-1'>
                  {t(`pages.user.shared.accountSettings.middle.group2.${key}`)}
                </span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuItem
          onClick={handleLogout}
          className='flex cursor-pointer items-center gap-2 py-2'
        >
          <Icon size={18} name='logOut' />
          <span className='flex-1'>
            {t('pages.user.shared.accountSettings.bottom')}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
