/* eslint-disable no-undefined */
'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

import Icon from '@/components/icons/icon';
import Spinner from '@/components/icons/spinner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useZodForm from '@/hooks/use-zod-form';
import useUploadAvatar from '@/hooks/user/use-upload-avatar';
import { handleErrorApi } from '@/lib/utils';
import {
  UploadAvatarSchema,
  type UploadAvatarType,
} from '@/schemas/user.schema';
import { useUserStore } from '@/stores/userStore';

export default function FormAvatar() {
  const { user } = useUserStore();
  const { mutateAsync: uploadAvatar, isPending } = useUploadAvatar();
  const t = useTranslations();
  const [preview, setPreview] = useState<string | null>(user?.avatar || null);
  const uploadAvatarForm = useZodForm(UploadAvatarSchema, {});
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function onSubmit(data: UploadAvatarType) {
    try {
      await uploadAvatar(data.avatar);
    } catch (error) {
      handleErrorApi(error);
    }
  }
  const avatarChange = uploadAvatarForm.watch('avatar');

  const handleUploadedFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  useEffect(
    () => () => {
      // Cleanup preview URL when component unmounts
      if (preview && !preview.startsWith('http')) {
        URL.revokeObjectURL(preview);
      }
    },
    [preview]
  );

  return (
    <Form {...uploadAvatarForm}>
      <form
        onSubmit={uploadAvatarForm.handleSubmit(onSubmit)}
        className='display-center flex-col'
      >
        <FormField
          control={uploadAvatarForm.control}
          name='avatar'
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <div className='display-center relative pb-4'>
                <Avatar className='size-40'>
                  <AvatarImage
                    loading='lazy'
                    className='object-cover'
                    src={preview || undefined}
                  />
                  <AvatarFallback>
                    <Icon size={30} name='user' />
                  </AvatarFallback>
                </Avatar>
                <FormLabel
                  htmlFor='avatar'
                  className='absolute bottom-0 rounded-lg border bg-white p-2 shadow-lg'
                >
                  <Icon size={16} name='cloudUpload' />
                </FormLabel>
              </div>

              <Input
                id='avatar'
                type='file'
                accept='image/*'
                className='hidden'
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    onChange(file);
                    handleUploadedFile(e);
                  }
                }}
                {...field}
                value={undefined}
                ref={fileInputRef}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        {avatarChange && (
          <Button
            type='submit'
            className='col-span-full mt-4 bg-[#23A695] hover:bg-[#23A695]/90'
          >
            {isPending ? (
              <>
                <Spinner />
                {t('ui.buttons.submitting')}
              </>
            ) : (
              <>{t('ui.buttons.uploadAvatar')}</>
            )}
          </Button>
        )}
      </form>
    </Form>
  );
}
