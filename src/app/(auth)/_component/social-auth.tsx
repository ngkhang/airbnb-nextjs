'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import Icon, { type IconName } from '@/components/icons/icon';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export function SocialAuth({ className }: Props) {
  const t = useTranslations('pages.auth.shared.socialAuth');
  return (
    <div className={cn('grid gap-6', className)}>
      <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
        <span className='relative z-10 bg-background px-2 text-muted-foreground'>
          {t('title')}
        </span>
      </div>
      <div className='grid grid-cols-3 gap-4'>
        {t.raw('items')?.map((icon: { title: string }) => {
          const key = Object.keys(icon)[0];
          return (
            <Button key={key} variant='outline' className='w-full'>
              <Icon name={key as IconName} />

              <span className='sr-only'>{icon.title}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
