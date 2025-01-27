import { getTranslations } from 'next-intl/server';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const keyMap = {
  inspirations: [
    'popular',
    'arts-culture',
    'outdoors',
    'mountains',
    'beach',
    'unique-stays',
    'categories',
    'things-to-do',
    'travel-tips-inspiration',
    'airbnb-friendly-apartments',
  ],
} as const;

export default async function Inspirations() {
  const t = await getTranslations();

  return (
    <div className='py-10'>
      <h3 className='mb-2 text-3xl font-bold text-[#222222]'>
        {t('pages.home.inspiration.title')}
      </h3>
      <Tabs
        defaultValue={t(
          `pages.home.inspiration.items.${keyMap.inspirations[0]}.title`
        )}
        className=''
      >
        <TabsList className='h-fit w-full rounded-none bg-inherit px-0'>
          <Carousel
            className='w-full border-b-2 border-[#DDDDDD]'
            opts={{
              duration: 10,
            }}
          >
            <CarouselContent className='-ml-1'>
              {keyMap.inspirations.map((item) => (
                <CarouselItem key={item} className='basis-auto pl-0'>
                  <TabsTrigger
                    key={item}
                    // value={item.title}
                    value={t(`pages.home.inspiration.items.${item}.title`)}
                    className='rounded-none border-b-2 border-transparent px-4 py-2 text-[#6A6A6A] data-[state=active]:border-[#222222] data-[state=active]:bg-inherit data-[state=active]:text-[#222222] data-[state=active]:shadow-none'
                  >
                    {t(`pages.home.inspiration.items.${item}.title`)}
                  </TabsTrigger>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* NOTE: Change arrow icon and hidden */}
            <CarouselPrevious className='-left-6 rounded-none border-none bg-transparent shadow-none' />
            <CarouselNext className='-right-6 rounded-none border-none bg-transparent shadow-none' />
          </Carousel>
        </TabsList>
        {keyMap.inspirations.map((tab) => (
          <TabsContent
            key={tab}
            value={t(`pages.home.inspiration.items.${tab}.title`)}
            className='mt-0 pt-8'
          >
            <ul className='grid grid-cols-2 gap-2 gap-y-6 lg:grid-cols-3 xl:grid-cols-6'>
              {t
                .raw(`pages.home.inspiration.items.${tab}.items`)
                ?.map(
                  (
                    item: { title: string; description: string },
                    index: number
                  ) => (
                    <li key={index} className='cursor-pointer text-sm'>
                      {/* TODO: Add "Show more" button */}
                      <p className='line-clamp-1 font-medium'>{item.title}</p>
                      <p className='line-clamp-1 text-[#6A6A6A]'>
                        {item.description}
                      </p>
                    </li>
                  )
                )}
            </ul>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
