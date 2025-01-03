'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import RegisterForm from '@/components/forms/register-form';
import AirbnbSymbol from '@/components/icons/airbnb-symbol';
import Apple from '@/components/icons/apple';
import Google from '@/components/icons/google';
import Meta from '@/components/icons/meta';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ROUTES from '@/constants/routes';

const iconAuth = {
  Google: <Google />,
  Apple: <Apple />,
  Meta: <Meta />,
} as const;

const contentRegisterPage = {
  metaData: {
    title: 'Register',
    description: '',
  },
  page: {
    title: 'Create a new account',
    description: 'Enter your email below to create your account',
    switch: {
      title: 'Login',
      subTitle: 'Already registered?',
    },
    thirdAuth: {
      title: 'or',
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

const { page } = contentRegisterPage;
export default function RegisterPage() {
  return (
    <div className='w-full max-w-md md:max-w-3xl xl:max-w-4xl'>
      <div className='flex flex-col gap-6'>
        <Card className='overflow-hidden'>
          <CardContent className='grid p-0 md:grid-cols-2'>
            <div className='relative hidden md:block'>
              <Link href={ROUTES.HOME} className='absolute left-3 top-3 z-10'>
                <AirbnbSymbol className='size-6' />
              </Link>
              <Image
                src='/images/placeholder.svg'
                alt='Image'
                width={50}
                height={100}
                className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
              />
            </div>

            <div className='flex flex-col gap-6 p-6 md:p-8'>
              {/* Change to Login */}
              <div className='text-end text-sm'>
                <span className='mr-1 hidden lg:inline-block'>
                  {page.switch.subTitle}
                </span>
                <Link href={ROUTES.AUTH.LOGIN} className='no-underline'>
                  {page.switch.title}
                </Link>
              </div>

              {/* Title */}
              <div className='flex flex-col items-center gap-2 text-center'>
                <h1 className='text-2xl font-bold'>{page.title}</h1>
                <p className='text-balance text-sm text-muted-foreground'>
                  {page.description}
                </p>
              </div>

              {/* Form */}
              <RegisterForm />

              {/* Auth for third-library */}
              <div className='grid gap-3'>
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
            </div>
          </CardContent>
        </Card>

        <div className='text-balance text-center text-xs text-muted-foreground [&_span]:cursor-pointer [&_span]:underline [&_span]:underline-offset-4 hover:[&_span]:text-primary'>
          <p>
            {page.footer.title} <span>{page.footer.policy}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
