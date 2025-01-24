'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import RegisterForm from '@/components/forms/register-form';
import Icon from '@/components/icons/icon';
import { Card, CardContent } from '@/components/ui/card';
import ROUTES from '@/constants/routes';
import { getPathFileAssets } from '@/helpers/fileAssets';

import { AuthFooter, SocialAuth } from '../_component';

export default function RegisterPage() {
  const t = useTranslations('pages.auth.register');

  return (
    <div className='w-full max-w-md md:max-w-3xl xl:max-w-4xl'>
      <div className='flex flex-col gap-6'>
        <Card className='overflow-hidden'>
          <CardContent className='grid p-0 md:grid-cols-2'>
            <div className='relative hidden md:block'>
              <Link href={ROUTES.HOME} className='absolute left-3 top-3 z-10'>
                <Icon name='airbnbSymbol' className='size-6' />
              </Link>
              <Image
                src={getPathFileAssets('image', 'placeholder.svg')}
                alt={t('banner')}
                width={50}
                height={100}
                className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
              />
            </div>

            <div className='flex flex-col gap-6 p-6 md:p-8'>
              {/* Change to Login */}
              <div className='text-end text-sm'>
                <span className='mr-1 hidden lg:inline-block'>
                  {t('switch.subTitle')}
                </span>
                <Link
                  href={ROUTES.AUTH.LOGIN}
                  className='underline underline-offset-4'
                >
                  {t('switch.title')}
                </Link>
              </div>

              {/* Title */}
              <div className='flex flex-col items-center gap-2 text-center'>
                <h1 className='text-2xl font-bold'>{t('title')}</h1>
                <p className='text-balance text-sm text-muted-foreground'>
                  {t('description')}
                </p>
              </div>

              {/* Form */}
              <RegisterForm />

              {/* Auth for third-library */}
              <SocialAuth className='gap-3' />
            </div>
          </CardContent>
        </Card>

        <AuthFooter />
      </div>
    </div>
  );
}
