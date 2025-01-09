'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import ROUTES from '@/constants/routes';
import useNotification from '@/hooks/use-notification';
import useZodForm from '@/hooks/use-zod-form';
import { RegisterSchema } from '@/schemas/auth.schema';
import authService from '@/services/auth.service';
import type { RegisterForm } from '@/types/auth.type';

import FormFieldComponent from './form-field';
import type { FieldConfig } from './form.type';

const registerFields: FieldConfig<typeof RegisterSchema>[] = [
  {
    key: 0,
    name: 'email',
    label: 'Email',
    required: true,
    type: 'email',
    placeholder: 'm@example.com',
  },
  {
    key: 1,
    name: 'name',
    label: 'Full name',
    required: true,
    type: 'text',
    placeholder: '',
  },
  {
    key: 2,
    name: 'password',
    label: 'Password',
    required: true,
    type: 'password',
    placeholder: '******',
  },
];

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  // const { setAccount } = useAuthContext();
  const { show } = useNotification();

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
        show('Register successful!');
        // - Redirect to home page
        router.push(ROUTES.AUTH.LOGIN);
        router.refresh();
      }
    } catch (error) {
      console.log('🚀 ~ onSubmit ~ error:', error);
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
        {registerFields.map((item) => (
          <FormFieldComponent key={item.key} form={form} config={{ ...item }} />
        ))}

        <Button
          type='submit'
          className='w-full bg-[#FF385C] transition-colors hover:bg-linear'
        >
          Create account
        </Button>
      </form>
    </Form>
  );
}
