'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import type { ConfigFormField } from '@/components/forms/form-field';
import FormFieldComponent from '@/components/forms/form-field';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useNotification from '@/hooks/use-notification';
import useZodForm from '@/hooks/use-zod-form';
import {
  UpdatePasswordSchema,
  type UpdatePassword,
} from '@/schemas/user.schema';

const configFormFields: ConfigFormField<typeof UpdatePasswordSchema>[] = [
  {
    name: 'currentPassword',
    required: true,
    isShow: true,
    type: 'password',
  },
  {
    name: 'newPassword',
    required: true,
    isShow: true,
    type: 'password',
  },
  {
    name: 'confirmPassword',
    required: true,
    isShow: true,
    type: 'password',
  },
] as const;

export default function ChangePasswordPage() {
  const t = useTranslations();
  const { show } = useNotification();
  const form = useZodForm(UpdatePasswordSchema);

  function onSubmit(data: UpdatePassword) {
    show(t('feedback.success.updatePassword'), { type: 'success' });
    // 1. Check current password
    // 2. Update new password
  }

  return (
    <div className='mx-auto lg:max-w-[400px]'>
      {/* Title */}
      <div className='mb-10'>
        <h2 className='mb-3 text-3xl font-semibold'>
          {t('pages.user.changePassword.title')}
        </h2>
        <p className='text-sm'>{t('pages.user.changePassword.description')}</p>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-10'>
          {configFormFields.map((item) => (
            <FormFieldComponent
              key={item.name}
              form={form}
              config={{
                ...item,
                label: t(`ui.inputs.${item.name}.label`),
                placeholder: t(`ui.inputs.${item.name}.placeholder`),
              }}
            />
          ))}

          <div className='col-span-full grid grid-cols-2 gap-4'>
            <Button
              type='submit'
              className='col-span-full bg-[#23A695] hover:bg-[#23A695]/90'
            >
              {t('ui.buttons.updatePassword')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
