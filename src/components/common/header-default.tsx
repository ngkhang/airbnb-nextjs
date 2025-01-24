import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

import ROUTES from '@/constants/routes';
import { cn } from '@/lib/utils';

import AccountPopover from '../account-popover';
import Icon from '../icons/icon';
import SearchBar from '../search/search-bar';
import { Button } from '../ui/button';

export default function HeaderDefault() {
  const t = useTranslations('layout.header');

  return (
    <header>
      <div className={cn('grid-cols-7 grid-rows-3 gap-4 py-3 md:grid md:py-5')}>
        {/* Logo section */}
        <div
          className={cn(
            'col-start-1 col-end-2 row-start-1 hidden self-center md:block'
          )}
        >
          <Link href={ROUTES.HOME} className='inline-block size-8'>
            <Icon name='airbnb' />
          </Link>
        </div>

        {/* Search - Children */}
        <div className='col-span-full row-span-2 row-start-2'>
          <SearchBar />
        </div>

        {/* Sub section */}
        <div className='col-start-5 col-end-8 row-start-1 hidden items-center justify-end space-x-2 md:flex'>
          <div className='flex items-center'>
            <Button
              className='rounded-full border-none px-5 py-3 text-sm font-semibold text-[#6A6A6A] shadow-none hover:text-inherit'
              variant='outline'
            >
              {t('host')}
            </Button>

            {/* TODO: Handle change language */}
            <Button
              className='size-10 rounded-full border-none shadow-none hover:text-[#6A6A6A]'
              variant='outline'
            >
              <Icon name='globe' />
            </Button>
          </div>

          {/* Menubar User */}
          <AccountPopover />
        </div>
      </div>
    </header>
  );
}
