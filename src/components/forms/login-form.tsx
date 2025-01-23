'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useLogin from '@/hooks/auth/use-login';
import useZodForm from '@/hooks/use-zod-form';
import { handleErrorApi } from '@/lib/utils';
import { LoginSchema, type LoginFormType } from '@/schemas/auth.schema';

import FormFieldComponent, { type ConfigFormField } from './form-field';
import Spinner from '../icons/spinner';

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
  const t = useTranslations();
  const { mutateAsync: login, isPending } = useLogin();

  const form = useZodForm(LoginSchema, {
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: LoginFormType) {
    try {
      await login(values);
    } catch (error) {
      handleErrorApi(error);
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
            }}
          />
        ))}

        <Button
          type='submit'
          disabled={isPending}
          className='w-full bg-[#FF385C] transition-colors hover:bg-linear'
        >
          {isPending ? (
            <>
              <Spinner />
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
