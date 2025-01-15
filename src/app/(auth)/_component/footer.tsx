'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export function Footer({ className }: Props) {
  const t = useTranslations('pages.auth.shared.footer');

  return (
    <div
      className={cn(
        'text-balance text-center text-xs text-muted-foreground [&_span]:cursor-pointer [&_span]:underline [&_span]:underline-offset-4 hover:[&_span]:text-primary',
        className
      )}
    >
      <p>
        {t('title')} <span>{t('policy')}</span>
      </p>
    </div>
  );
}
