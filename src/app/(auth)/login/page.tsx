'use client';

import Link from 'next/link';
import React from 'react';

import LoginForm from '@/components/forms/login-form';
import AirbnbSymbol from '@/components/icons/airbnb-symbol';
import ROUTES from '@/constants/routes';

import { AuthFooter, ThirdAuth } from '../_component';

// TODO: Call API

const contentLoginPage = {
  metaData: {
    title: 'Login',
    description: '',
  },
  page: {
    title: 'Welcome back!',
    description: '',
    switch: {
      title: 'Register',
      subTitle: 'New to AirBnb?',
    },
  },
};

const { page } = contentLoginPage;

export default function LoginPage() {
  return (
    <div className='w-full max-w-sm'>
      <div className='flex flex-col gap-6'>
        {/* Icon */}
        <div className='flex items-center justify-center'>
          <Link href={ROUTES.HOME} className='font-medium'>
            <AirbnbSymbol className='size-6' />
          </Link>
        </div>

        <div className='flex flex-col gap-6'>
          {/* Main */}
          <div className='flex flex-col gap-6'>
            {/* Title */}
            <div className='flex flex-col items-center gap-2'>
              <h1 className='text-xl font-bold'>{page.title}</h1>
              {page.description && (
                <p className='text-balance text-muted-foreground'>
                  {page.description}
                </p>
              )}
            </div>

            {/* Form */}
            <LoginForm />
          </div>

          {/* Auth for third-library */}
          <ThirdAuth />

          <div className='text-center text-sm'>
            <span className='mr-1'>{page.switch.subTitle}</span>
            <Link
              href={ROUTES.AUTH.REGISTER}
              className='underline underline-offset-4'
            >
              {page.switch.title}
            </Link>
          </div>

          {/* Sub page */}
          <AuthFooter />
        </div>
      </div>
    </div>
  );
}
