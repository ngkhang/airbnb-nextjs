'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import Apple from '@/components/icons/apple';
import Google from '@/components/icons/google';
import Meta from '@/components/icons/meta';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// FIXME: Fix Icon component to using name, dot and bracket notation with string
const iconAuth = {
  google: <Google />,
  apple: <Apple />,
  meta: <Meta />,
} as const;

interface Props {
  className?: string;
}

const keysSocialAuth = ['apple', 'google', 'meta'] as const;

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
        {keysSocialAuth.map((key) => (
          <Button key={key} variant='outline' className='w-full'>
            {iconAuth[key as keyof typeof iconAuth]}
            <span className='sr-only'>{t(`items.${key}`)}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
