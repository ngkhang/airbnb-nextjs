'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import ROUTES from '@/constants/routes';
import useNotification from '@/hooks/use-notification';
import useZodForm from '@/hooks/use-zod-form';
import { LoginSchema } from '@/schemas/auth.schema';
import authService from '@/services/auth.service';
import type { LogInForm } from '@/types/auth.type';

import FormFieldComponent, { type ConfigFormField } from './form-field';
import Icon from '../icons/icon';
import { useAuthContext } from '../providers/auth.provider';

const configFormFields: ConfigFormField<typeof LoginSchema>[] = [
  {
    name: 'email',
    required: true,
    isShow: true,
    type: 'email',
  },
  {
    name: 'password',
    required: true,
    isShow: true,
    type: 'password',
  },
] as const;

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { setAccount } = useAuthContext();
  const { show } = useNotification();
  const t = useTranslations();

  const form = useZodForm(LoginSchema, {
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: LogInForm) {
    if (loading) return;
    setLoading(true);

    // Send form data login
    const res = await authService.login(values);

    if (res.content) {
      // - Set token and user info to global state (using to Client component)
      setAccount({ ...res.content });
      // - Set token and role in cookie (using to Server component)
      await authService.loginNextServer(res.content);
      // - Get notification
      setLoading(false);
      show(t('feedback.success.login'));
      // - Redirect to home page
      router.push(ROUTES.HOME);
      router.refresh();
    }
    // TODO: Catch and display error to Login functionality
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-6'
      >
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

        <Button
          type='submit'
          disabled={loading}
          className='w-full bg-[#FF385C] transition-colors hover:bg-linear'
        >
          {loading ? (
            <>
              <Icon.spinner />
              {t('ui.buttons.submitting')}
            </>
          ) : (
            <>{t('ui.buttons.login')}</>
          )}
        </Button>
      </form>
    </Form>
  );
}
