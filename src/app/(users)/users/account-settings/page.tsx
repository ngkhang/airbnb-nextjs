'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

import Icon from '@/components/icons/icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ROUTES from '@/constants/routes';
import { cn } from '@/lib/utils';

const keyMap = {
  accountSettingPage: {
    key: [
      'idCard',
      'stickyNote',
      'megaphone',
      'settings2',
      'chartNoAxesColumn',
      'gift',
    ],
    config: {
      idCard: {
        isActive: true,
        url: `${ROUTES.USER.ACCOUNT_SETTINGS}/update-profile`,
      },
      stickyNote: {
        isActive: true,
        url: `${ROUTES.USER.ACCOUNT_SETTINGS}/change-password`,
      },
      megaphone: {
        isActive: false,
        url: ROUTES.HOME,
      },
      settings2: {
        isActive: false,
        url: ROUTES.HOME,
      },
      chartNoAxesColumn: {
        isActive: false,
        url: ROUTES.HOME,
      },
      gift: {
        isActive: false,
        url: ROUTES.HOME,
      },
    },
  },
} as const;

export default function AccountSettingsPage() {
  const t = useTranslations();

  return (
    <div>
      {/* Title */}
      <div className='mb-10'>
        <h2 className='mb-3 text-3xl font-semibold'>
          {t('pages.user.accountSettings.title')}
        </h2>
        <p className='text-sm'>{t('pages.user.accountSettings.description')}</p>
      </div>

      <div className='grid gap-6 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4'>
        {keyMap.accountSettingPage.key.map((key) => (
          <Link
            href={keyMap.accountSettingPage.config[key].url}
            key={key}
            className={cn(
              !keyMap.accountSettingPage.config[key].isActive &&
                'pointer-events-none'
            )}
          >
            <Card
              className={cn(
                'h-full p-5',
                keyMap.accountSettingPage.config[key].isActive
                  ? 'shadow-lg'
                  : 'opacity-70'
              )}
            >
              <CardHeader className='p-0 pb-4'>
                <CardTitle>
                  <Icon size={24} name={key} />
                </CardTitle>
              </CardHeader>
              <CardContent className='p-0'>
                <p className='mb-2 font-semibold'>
                  {t(`pages.user.accountSettings.items.${key}.description`)}
                </p>
                <p className='text-sm text-muted-foreground'>
                  {t(`pages.user.accountSettings.items.${key}.description`)}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
