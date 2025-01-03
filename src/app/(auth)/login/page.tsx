'use client';

import Link from 'next/link';
import React from 'react';

import LoginForm from '@/components/forms/login-form';
import AirbnbSymbol from '@/components/icons/airbnb-symbol';
import Apple from '@/components/icons/apple';
import Google from '@/components/icons/google';
import Meta from '@/components/icons/meta';
import { Button } from '@/components/ui/button';
import ROUTES from '@/constants/routes';

// TODO: Create list fields for form
// TODO: Call API

const iconAuth = {
  Google: <Google />,
  Apple: <Apple />,
  Meta: <Meta />,
} as const;

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
    thirdAuth: {
      title: 'Or continue with',
      items: [
        {
          key: 0,
          icon: 'Apple',
          srOnly: 'Login with Apple',
        },
        {
          key: 1,
          icon: 'Google',
          srOnly: 'Login with Google',
        },
        {
          key: 2,
          icon: 'Meta',
          srOnly: 'Login with Meta',
        },
      ],
    },
    footer: {
      title:
        "We'll call or text you to confirm your number. Standard message and data rates apply.",
      policy: 'Privacy Policy',
    },
  },
};

const { page } = contentLoginPage;

export default function LoginPage() {
  return (
    <div className='flex w-full max-w-sm flex-col gap-6'>
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
        <div className='flex flex-col gap-6'>
          <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
            <span className='relative z-10 bg-background px-2 text-muted-foreground'>
              {page.thirdAuth.title}
            </span>
          </div>

          <div className='grid grid-cols-3 gap-4'>
            {page.thirdAuth.items.map((item) => (
              <Button key={item.key} variant='outline' className='w-full'>
                {iconAuth[item.icon as keyof typeof iconAuth]}
                <span className='sr-only'>{item.srOnly}</span>
              </Button>
            ))}
          </div>
        </div>

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

        <div className='text-balance text-center text-xs text-muted-foreground [&_span]:cursor-pointer [&_span]:underline [&_span]:underline-offset-4 hover:[&_span]:text-primary'>
          <p>
            {page.footer.title} <span>{page.footer.policy}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
