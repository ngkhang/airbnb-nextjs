'use client';

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import AirbnbBlack from '@/components/icons/airbnb-black';

const notFoundPage = {
  metaData: {
    title: '404 Page Not Found - Airbnb',
    description: '',
  },
  page: {
    title: 'Oops!',
    subTitle: "We can't seem to find the page you're looking for.",
    helpLinks: {
      title: 'Here are some helpful links instead:',
      items: [
        {
          key: 0,
          title: 'Home',
        },
        {
          key: 1,
          title: 'Search',
        },
        {
          key: 2,
          title: 'Help',
        },
        {
          key: 3,
          title: 'Traveling on Airbnb',
        },
        {
          key: 4,
          title: 'Hosting on Airbnb',
        },
        {
          key: 5,
          title: 'Trust & Safety',
        },
        {
          key: 6,
          title: 'Sitemap',
        },
      ],
    },
    banner: {
      url: '/images/404-Airbnb.gif',
      alt: 'Girl has dropped her ice cream.',
    },
  },
};

const routes = {
  home: '/',
};

const { metaData, page } = notFoundPage;

export const metadata: Metadata = metaData;

export default function NotFoundPage() {
  return (
    <div className='min-h-screen'>
      {/* Header */}
      <header className='mx-auto w-auto p-3 pb-0 md:w-[740px] md:px-6 xl:w-[1080px]'>
        <div className='flex items-center justify-start'>
          <Link href={routes.home} className=''>
            <AirbnbBlack />
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className='mx-auto my-12 w-auto grid-cols-2 gap-6 px-3 md:grid md:w-[740px] md:px-6 xl:w-[1080px]'>
        {/* Content */}
        <div className='mb-12 text-[#484848]'>
          <h1 className='mb-6 text-[120px] font-bold xl:text-[145px]'>
            {page.title}
          </h1>
          <h2 className='mb-4 text-3xl'>{page.subTitle}</h2>
          <ul className='text-sm'>
            <li>{page.helpLinks.title}</li>
            {page.helpLinks.items.map((item) => (
              <li key={item.key} className='text-[#008489]'>
                <Link href={routes.home}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Banner */}
        <div className='flex items-center justify-center px-6 md:px-0'>
          <Image
            src={page.banner.url}
            alt={page.banner.alt}
            width={313}
            height={428}
            quality={75}
            unoptimized
          />
        </div>
      </main>
    </div>
  );
}
