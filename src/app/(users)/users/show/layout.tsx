'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import Icon from '@/components/icons/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ROUTES from '@/constants/routes';
import { useUserStore } from '@/stores/userStore';

import { DropdownSettingsUser } from './_components/dropdown-setting';

interface Props {
  children: React.ReactNode;
}

const keyMap = {
  userShortOverview: ['reviews', 'rating', 'yearsOnAirbnb'],
  confirmed: ['name', 'email', 'phone'],
} as const;

export default function DashboardUserLayout({ children }: Props) {
  const { user } = useUserStore();
  const t = useTranslations();

  return (
    <div className='grid grid-rows-1 gap-6 lg:flex lg:gap-14'>
      {/* Left section */}
      <div className='lg:relative lg:w-[350px]'>
        {user && (
          <div className='lg:sticky lg:top-[120px] lg:grid lg:gap-6'>
            {/* Short card Info */}
            <Card className='grid grid-cols-5 gap-4 p-5 shadow-xl'>
              <CardHeader className='col-span-3 flex flex-col items-center p-0'>
                <div className='relative mb-5 px-4'>
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>
                      <Icon name='user' size='40' className='size-full' />
                    </AvatarFallback>
                  </Avatar>
                  <div className='absolute bottom-2 right-6 rounded-full bg-brand p-1 lg:bottom-0'>
                    <Icon name='shieldCheck' size={18} className='text-white' />
                  </div>
                </div>
                <CardTitle className='text-3xl font-semibold'>
                  {user.name.split(' ').slice(-1).toString()}
                </CardTitle>
                <CardDescription>{user.role}</CardDescription>

                <DropdownSettingsUser side='right' />
              </CardHeader>

              <CardContent className='col-span-2 p-0'>
                {keyMap.userShortOverview.map((key, index) => (
                  <div key={key} className='space-y-1'>
                    {index !== 0 && <Separator className='my-4' />}
                    <div className='flex items-center'>
                      <span className='text-2xl font-semibold'>
                        {t(
                          `pages.user.shared.shortOverview.${key}.description`
                        )}
                      </span>
                      {key === 'rating' && (
                        <Icon
                          name='star'
                          className='ml-1 fill-black'
                          size={20}
                        />
                      )}
                    </div>
                    <p className='text-sm font-medium text-muted-foreground'>
                      {t(`pages.user.shared.shortOverview.${key}.title`)}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Confirmed card */}
            <Card className='hidden gap-4 p-5 lg:grid'>
              <CardHeader className='p-0'>
                <CardTitle className='text-2xl font-semibold'>
                  {`${user.name}${t('pages.user.shared.confirmed.title')}`}
                </CardTitle>
              </CardHeader>
              <CardContent className='p-0'>
                <ul className='grid gap-3'>
                  {keyMap.confirmed.map((key) => (
                    <li key={key} className='flex items-center gap-3'>
                      <Icon
                        name={user[key as keyof typeof user] ? 'check' : 'dot'}
                      />
                      <span className='flex-1'>
                        {t(`pages.user.shared.confirmed.items.${key}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className='hidden items-center lg:flex'>
              <Icon name='flag' size={20} className='mr-2 fill-black' />
              <Link className='font-medium underline' href={ROUTES.HOME}>
                {t('pages.user.shared.report.title')}
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Right section */}
      <div className='lg:flex-1'>{children}</div>
    </div>
  );
}
