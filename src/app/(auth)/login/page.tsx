'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

import LoginForm from '@/components/forms/login-form';
import Icon from '@/components/icons/icon';
import ROUTES from '@/constants/routes';

import { AuthFooter, SocialAuth } from '../_component';

export default function LoginPage() {
  const t = useTranslations('pages.auth.login');

  return (
    <div className='w-full max-w-sm'>
      <div className='flex flex-col gap-6'>
        {/* Icon */}
        <div className='flex items-center justify-center'>
          <Link href={ROUTES.HOME} className='font-medium'>
            <Icon.airbnbSymbol className='size-6' />
          </Link>
        </div>

        <div className='flex flex-col gap-6'>
          {/* Main */}
          <div className='flex flex-col gap-6'>
            {/* Title */}
            <div className='flex flex-col items-center gap-2'>
              <h1 className='text-xl font-bold'>{t('title')}</h1>
              <p className='text-balance text-muted-foreground'>
                {t('description')}
              </p>
            </div>

            {/* Form */}
            <LoginForm />
          </div>

          {/* Auth for third-library */}
          <SocialAuth />

          <div className='text-center text-sm'>
            <span className='mr-1'>{t('switch.subTitle')}</span>
            <Link
              href={ROUTES.AUTH.REGISTER}
              className='underline underline-offset-4'
            >
              {t('switch.title')}
            </Link>
          </div>

          {/* Sub page */}
          <AuthFooter />
        </div>
      </div>
    </div>
  );
}
