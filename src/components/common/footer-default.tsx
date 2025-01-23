import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

import Icon, { type IconName } from '../icons/icon';
import { Separator } from '../ui/separator';

const socialIcon: IconName[] = ['facebook', 'x', 'instagram'];

export default function FooterDefault() {
  const t = useTranslations('layout.footer');

  return (
    <div>
      {/* Main Footer */}
      <div className='grid lg:grid-cols-3 lg:gap-2'>
        {t
          .raw('items')
          ?.map(({ title, items }: { title: string; items: string[] }) => (
            <div key={title} className='text-sm'>
              <div className='py-6 text-sm xl:py-12'>
                <h3 className='mb-3 font-bold'>{title}</h3>
                <ul className='grid gap-2'>
                  {items.map((child: string) => (
                    <li key={child} className='cursor-pointer hover:underline'>
                      {child}
                    </li>
                  ))}
                </ul>
              </div>
              <Separator className='h-[2px] lg:hidden' />
            </div>
          ))}
      </div>

      <Separator className='md:center hidden h-[2px] flex-col lg:block' />

      {/* Sub Footer */}
      <div className='py-6'>
        <div className='flex-col items-center justify-between text-sm md:flex xl:flex-row'>
          <div className='mb-4 items-center md:flex xl:order-2 xl:m-0'>
            <div className='mr-10 flex font-bold'>
              <div className='mr-3 flex cursor-pointer items-center'>
                <Icon name='globe' className='mr-1' />
                <span className='hover:underline'>English (US)</span>
              </div>
              <div className='flex cursor-pointer items-center'>
                <Icon name='vnd' className='mr-1' />
                <span className='hover:underline'>VND</span>
              </div>
            </div>
            <div className='hidden items-center md:flex'>
              {socialIcon.map((icon) => (
                <Icon
                  key={icon}
                  name={icon}
                  className='ml-2 size-6 cursor-pointer hover:underline'
                />
              ))}
            </div>
          </div>
          <div className='flex-col flex-wrap items-center lg:flex xl:order-1 xl:flex-row'>
            <p>&copy; {t('copyright')}</p>
            <ul className='flex flex-wrap'>
              {t.raw('subs')?.map((item: string, key: number) => (
                <div key={key} className='flex items-center'>
                  <span
                    className={cn(
                      'px-2 py-1 text-lg',
                      key === 0 && 'hidden xl:block'
                    )}
                  >
                    ·
                  </span>
                  <li className='cursor-pointer hover:underline'>{item}</li>
                  {t.raw('subs')?.length - 1 === key && (
                    <div className='ml-2'>
                      <Icon name='privacy' />
                    </div>
                  )}
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
