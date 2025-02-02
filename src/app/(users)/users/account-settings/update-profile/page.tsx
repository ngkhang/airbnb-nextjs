'use client';

import { useTranslations } from 'next-intl';

import FormAvatar from './_components/FormAvatar';
import FormProfile from './_components/FormProfile';

export default function UpdateProfilePage() {
  const t = useTranslations();

  return (
    <div className='mx-auto lg:max-w-[700px]'>
      {/* Title */}
      <div className='mb-10'>
        <h2 className='mb-3 text-3xl font-semibold'>
          {t('pages.user.updateProfile.title')}
        </h2>
        <p className='text-sm'>{t('pages.user.updateProfile.description')}</p>
      </div>

      {/* Main form */}
      <div className='grid gap-4 lg:grid-cols-3'>
        {/* Form upload avatar */}
        <div className='lg:col-span-1'>
          <FormAvatar />
        </div>

        {/* Form update profile */}
        <div className='lg:col-span-2'>
          <FormProfile />
        </div>
      </div>
    </div>
  );
}
