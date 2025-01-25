import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

import ROUTES from '@/constants/routes';
import { getPathFileAssets } from '@/helpers/fileAssets';
import { cn } from '@/lib/utils';

import Icon from './icons/icon';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { Label } from './ui/label';
import { Switch } from './ui/switch';

export default function CategoryBar() {
  const t = useTranslations();

  return (
    <section className='grid grid-flow-col grid-cols-5 xl:grid-cols-7'>
      <Carousel
        className='col-span-full md:col-span-2 lg:col-span-3 xl:col-span-5'
        opts={{ duration: 25 }}
      >
        <CarouselContent className='mx-2'>
          {t
            .raw('layout.categories.items')
            ?.map(
              (
                category: { title: string; fileName: string },
                index: number
              ) => (
                <CarouselItem
                  key={index}
                  data-state='active'
                  className={cn(
                    'flex basis-auto flex-col items-center border-b-[3px] border-transparent px-3 py-4 text-[#6A6A6A] opacity-60 hover:border-[#DDDDDD] hover:opacity-85',
                    index === 0 &&
                      'opacity-100 data-[state=active]:border-[#000000] data-[state=active]:text-[#000000]'
                  )}
                >
                  <span className='mb-2 size-6'>
                    <Image
                      src={`${getPathFileAssets('categories', category.fileName)}`}
                      alt={category.title}
                      width={50}
                      height={50}
                      className='w-full'
                      quality={75}
                    />
                  </span>
                  <span className='text-xs font-semibold'>
                    {category.title}
                  </span>
                </CarouselItem>
              )
            )}
        </CarouselContent>

        <CarouselPrevious className='-left-6 hidden fill-black shadow-none hover:bg-[rgba(244,242,242,0.5)] md:flex' />
        <CarouselNext className='-right-6 hidden fill-black shadow-none hover:bg-[rgba(244,242,242,0.5)] md:flex' />
      </Carousel>

      <div className='hidden justify-end space-x-4 py-3 text-sm font-medium md:col-span-3 md:flex lg:col-span-2'>
        <Link href={ROUTES.HOME} className='button-default'>
          <Icon name='slidersHorizontal' size={16} />
          <span>{t('ui.buttons.filter')}</span>
        </Link>

        <Link href={ROUTES.HOME} className='button-default'>
          <Label>{t('ui.buttons.switch')}</Label>
          <Switch className='h-6 data-[state=checked]:bg-[#6A6A6A]' />
        </Link>
      </div>
    </section>
  );
}
