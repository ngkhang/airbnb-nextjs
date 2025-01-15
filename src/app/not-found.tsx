'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import Icon from '@/components/icons/icon';
import ROUTES from '@/constants/routes';
import { getPathFileAssets } from '@/helpers/fileAssets';

// FIXME: Handle get metaData from locale in Client component
// export async function generateMetadata(): Promise<Metadata> {
// }

const keyLinks = [
  'home',
  'search',
  'help',
  'traveling',
  'hosting',
  'safety',
  'sitemap',
] as const;

export default function NotFoundPage() {
  const t = useTranslations('pages.notFound');

  return (
    <div className='min-h-screen'>
      {/* Header */}
      <header className='mx-auto w-auto p-3 pb-0 md:w-[740px] md:px-6 xl:w-[1080px]'>
        <div className='flex items-center justify-start'>
          <Link href={ROUTES.HOME}>
            <Icon.airbnbBlack />
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className='mx-auto my-12 w-auto grid-cols-2 gap-6 px-3 md:grid md:w-[740px] md:px-6 xl:w-[1080px]'>
        {/* Content */}
        <div className='mb-12 text-[#484848]'>
          <h1 className='mb-6 text-[120px] font-bold xl:text-[145px]'>
            {t('title')}
          </h1>
          <h2 className='mb-4 text-3xl'>{t('subTitle')}</h2>
          <ul className='text-sm'>
            <li>{t('helpLinks.title')}</li>
            {keyLinks.map((key) => (
              <li key={key} className='text-[#008489]'>
                <Link href={ROUTES.HOME}>{t(`helpLinks.items.${key}`)}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Banner */}
        <div className='flex items-center justify-center px-6 md:px-0'>
          <Image
            src={getPathFileAssets('image', '404')}
            alt={t('banner')}
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
