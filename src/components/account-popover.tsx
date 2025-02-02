'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

import useLogout from '@/hooks/auth/use-logout';
import { useUserStore } from '@/stores/userStore';

import Icon from './icons/icon';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Separator } from './ui/separator';

export default function AccountPopover() {
  const { user } = useUserStore();
  const t = useTranslations();
  const { mutateAsync: logout } = useLogout();

  const handleLogout = async () => {
    logout();
  };

  return (
    <Popover onOpenChange={() => {}}>
      <PopoverTrigger asChild>
        <Button variant='outline' className='button-default h-fit rounded-full'>
          <Icon name='menu' />
          <Avatar className='h-full w-auto'>
            <AvatarImage
              sizes='18'
              src={user && user.avatar ? user.avatar : ''}
            />
            <AvatarFallback>
              <Icon name='user' size='18' />
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent align='end' className='w-full px-0'>
        <div className='grid gap-2'>
          {user ? (
            <>
              {t
                .raw('layout.header.accountPopover.logged.top')
                ?.map((item: { title: string; url: string }, key: number) => (
                  <div key={key}>
                    <Link
                      className='inline-block w-full py-2 pl-6 pr-16 hover:bg-[#EBEBEB]'
                      href={item.url}
                    >
                      {item.title}
                    </Link>
                  </div>
                ))}
              <Separator className='h-[1px]' />
              {t
                .raw('layout.header.accountPopover.logged.bottom')
                ?.map((item: { title: string; url: string }, key: number) => (
                  <div key={key}>
                    <Link
                      className='inline-block w-full py-2 pl-6 pr-16 hover:bg-[#EBEBEB]'
                      href={item.url}
                    >
                      {item.title}
                    </Link>
                  </div>
                ))}
              <Separator className='h-[1px]' />
              <Button
                type='button'
                variant='outline'
                className='justify-start rounded-none border-none py-2 pl-6 pr-16 text-base font-normal shadow-none hover:bg-[#EBEBEB] hover:text-inherit'
                onClick={handleLogout}
              >
                {t('ui.buttons.logout')}
              </Button>
            </>
          ) : (
            <>
              {t
                .raw('layout.header.accountPopover.unLogin.top')
                ?.map((item: { title: string; url: string }, key: number) => (
                  <div key={key}>
                    <Link
                      className='inline-block w-full py-2 pl-6 pr-16 hover:bg-[#EBEBEB]'
                      href={item.url}
                    >
                      {item.title}
                    </Link>
                  </div>
                ))}
              <Separator className='h-[1px]' />
              {t
                .raw('layout.header.accountPopover.unLogin.bottom')
                .map((item: { title: string; url: string }, key: number) => (
                  <div key={key}>
                    <Link
                      className='inline-block w-full py-2 pl-6 pr-16 hover:bg-[#EBEBEB]'
                      href={item.url}
                    >
                      {item.title}
                    </Link>
                  </div>
                ))}
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
