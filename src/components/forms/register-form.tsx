'use client';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import ROUTES from '@/constants/routes';
import useNotification from '@/hooks/use-notification';
import useZodForm from '@/hooks/use-zod-form';
import { RegisterSchema } from '@/schemas/auth.schema';
import authService from '@/services/auth.service';
// FIXME: type 'RegisterForm' is defined but never used.
import type { RegisterForm } from '@/types/auth.type';

import FormFieldComponent, { type ConfigFormField } from './form-field';
import Icon from '../icons/icon';

const configFormFields: ConfigFormField<typeof RegisterSchema>[] = [
  {
    name: 'email',
    required: true,
    isShow: true,
    type: 'email',
  },
  {
    name: 'name',
    required: true,
    isShow: true,
    type: 'text',
  },
  {
    name: 'password',
    required: true,
    isShow: true,
    type: 'password',
  },
  {
    name: 'role',
    required: true,
    isShow: true,
    type: 'select',
    optionsVal: {
      admin: 'ADMIN',
      user: 'USER',
    },
  },
] as const;

const ROLE_KEYS = ['admin', 'user'] as const;

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { show } = useNotification();
  const t = useTranslations();

  const form = useZodForm(RegisterSchema, {
    defaultValues: {
      email: '',
      password: '',
      name: '',
      role: 'USER',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: RegisterForm) {
    if (loading) return;
    setLoading(true);

    try {
      // Send form data login
      const res = await authService.register(values);

      if (res.statusCode !== 200)
        throw new Error(
          typeof res.content === 'string' ? res.content : res.message
        );

      if (res.content) {
        // - Get notification
        show(t('feedback.success.register'));
        // - Redirect to home page
        router.push(ROUTES.AUTH.LOGIN);
        router.refresh();
      }
    } catch (error) {
      // TODO: Catch and display error to Register functionality
      console.log('🚀 ~ onSubmit ~ error:', typeof error);
    } finally {
      setLoading(false);
    }
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
              options:
                item.optionsVal &&
                ROLE_KEYS.map((key) => {
                  return {
                    value: item.optionsVal ? item.optionsVal[key] : '',
                    label: t(`ui.inputs.role.options.${key}`),
                  };
                }),
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
            <>{t('ui.buttons.register')}</>
          )}
        </Button>
      </form>
    </Form>
  );
}
