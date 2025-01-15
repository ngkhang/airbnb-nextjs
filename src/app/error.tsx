'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import ROUTES from '@/constants/routes';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  const router = useRouter();
  const t = useTranslations();

  useEffect(() => {
    // console.error(error);
  }, [error]);

  return (
    <main className='flex h-full items-center justify-center'>
      <div className='w-auto px-3 text-card-foreground md:max-w-[550px] md:rounded-xl md:border md:bg-card md:p-8 md:shadow xl:max-w-[650px]'>
        <div className='mb-10 text-center lg:mb-12'>
          <h1 className='mb-7 text-3xl font-bold'>{t('pages.error.title')}</h1>
          <p className='text-sm text-[#6A6A6A] lg:text-base'>{error.message}</p>
        </div>

        <div className='flex flex-col gap-3 sm:flex-row'>
          {/* TODO: Change bg button */}
          <Button
            className='flex-1'
            variant='outline'
            onClick={() => router.push(ROUTES.HOME)}
          >
            {t('ui.buttons.backHome')}
          </Button>
          <Button className='flex-1' variant='outline' onClick={() => reset()}>
            {t('ui.buttons.tryAgain')}
          </Button>
        </div>
      </div>
    </main>
  );
}
