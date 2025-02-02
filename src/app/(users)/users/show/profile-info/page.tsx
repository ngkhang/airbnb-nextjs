'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import type { IconName } from '@/components/icons/icon';
import Icon from '@/components/icons/icon';
import { Separator } from '@/components/ui/separator';
import { useUserStore } from '@/stores/userStore';
import type { User } from '@/types/user.type';

const keyMap = {
  profileUser: {
    fields: ['name', 'email', 'phone', 'birthday', 'gender'],
    subInfo: ['item1', 'item2', 'item3'],
  },
} as const;

export default function ProfileInfo() {
  const t = useTranslations();
  const { user } = useUserStore();

  return (
    <div>
      <div className='grid gap-8 lg:gap-12'>
        {/* Title */}
        <div>
          <h2 className='mb-3 text-3xl font-semibold'>
            {t('pages.user.profileInfo.title')}
          </h2>
          <p className='text-sm'>{t('pages.user.profileInfo.description')}</p>
        </div>

        {/* Main */}
        {user && (
          <div className='grid-cols-2 items-start gap-8 lg:grid'>
            <div className='grid gap-2'>
              {keyMap.profileUser.fields.map((key, index) => (
                <div key={key} className='font-medium'>
                  {index !== 0 && <Separator className='my-5' />}
                  <p className='mb-1'>
                    {t(`pages.user.profileInfo.fields.${key}.title`)}
                  </p>
                  {key === 'gender' ? (
                    <p className='text-muted-foreground'>
                      {user[key as keyof User] ? 'Male' : 'Female'}
                    </p>
                  ) : (
                    <p className='text-muted-foreground'>
                      {user[key as keyof User] ||
                        t(`pages.user.profileInfo.fields.${key}.textEmpty`)}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className='grid-row-3 hidden gap-3 rounded-lg border p-6 lg:grid'>
              {keyMap.profileUser.subInfo.map((key, index) => (
                <div key={key} className='grid-row-3 grid gap-2'>
                  {index !== 0 && <Separator className='my-4' />}
                  <Icon
                    name={
                      t(
                        `pages.user.profileInfo.subInfo.${key}.icon`
                      ) as IconName
                    }
                    size={40}
                    className='mb-2 text-primary'
                  />
                  <span className='font-medium'>
                    {t(`pages.user.profileInfo.subInfo.${key}.title`)}
                  </span>
                  <span className='text-sm text-muted-foreground'>
                    {t(`pages.user.profileInfo.subInfo.${key}.description`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
