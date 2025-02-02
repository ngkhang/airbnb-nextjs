'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import Icon, { type IconName } from '@/components/icons/icon';
import { Separator } from '@/components/ui/separator';
import ROUTES from '@/constants/routes';
import { useUserStore } from '@/stores/userStore';

const keyMap = {
  confirmed: ['name', 'email', 'phone'],
  ask: [
    'where',
    'work',
    'music',
    'unique',
    'pets',
    'speak',
    'obsessed',
    'biography',
    'forGuests',
    'breakfast',
  ],
} as const;

export default function DashboardPage() {
  const { user } = useUserStore();
  const t = useTranslations();

  if (user) {
    return (
      <div>
        <div className='grid gap-8'>
          {/* Title section */}
          <div className='hidden lg:block'>
            <h2 className='text-3xl font-semibold'>{`${t('pages.user.dashboard.title')} ${user.name}`}</h2>
          </div>

          {/* Shared Info section */}
          <ul className='grid gap-4 xl:grid-cols-2'>
            {keyMap.ask.map((key) => (
              <li key={key} className='flex items-center gap-3'>
                <Icon
                  name={
                    t(
                      `pages.user.dashboard.publicInfo.ask.${key}.icon`
                    ) as IconName
                  }
                  size={24}
                />
                <span className='flex-1 text-base'>
                  {`${t(`pages.user.dashboard.publicInfo.ask.${key}.title`)}: ${t(`pages.user.dashboard.publicInfo.ask.${key}.description`)}`}
                </span>
              </li>
            ))}
          </ul>

          {/* About section */}
          <p className='whitespace-pre-line'>
            {t('pages.user.dashboard.publicInfo.about')}
          </p>
        </div>

        <Separator className='my-10' />

        {/* Verify account */}
        <div className='lg:hidden'>
          <h3 className='mb-5 text-xl font-semibold'>{`${user.name}'s ${t('pages.user.shared.confirmed.title')}`}</h3>

          <ul className='grid gap-3'>
            {keyMap.confirmed.map((key) => (
              <li key={key} className='flex items-center gap-3'>
                <Icon name={user[key as keyof typeof user] ? 'check' : 'dot'} />
                <span className='flex-1'>
                  {t(`pages.user.shared.confirmed.items.${key}`)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className='lg:hidden'>
          <Separator className='my-10' />
          <div className='flex items-center'>
            <Icon name='flag' size={20} className='mr-2 fill-black' />
            <Link className='font-medium underline' href={ROUTES.NOT_FOUND}>
              {t('pages.user.shared.report.title')}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
