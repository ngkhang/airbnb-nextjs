'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import ROUTES from '@/constants/routes';
import useNotification from '@/hooks/use-notification';
import useZodForm from '@/hooks/use-zod-form';
import { LoginSchema } from '@/schemas/auth.schema';
import authService from '@/services/auth.service';
import type { LogInForm } from '@/types/auth.type';

import FormFieldComponent from './form-field';
import type { FieldConfig } from './form.type';
import { useAuthContext } from '../providers/auth.provider';

const loginFields: FieldConfig<typeof LoginSchema>[] = [
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
    name: 'password',
    label: 'Password',
    required: true,
    type: 'password',
    placeholder: '******',
  },
];

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { setAccount } = useAuthContext();
  const { show } = useNotification();

  const form = useZodForm(LoginSchema, {
    defaultValues: {
      email: 'khang@gmail.com',
      password: '1234',
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
      show('Login successful!');
      // - Redirect to home page
      router.push(ROUTES.HOME);
      router.refresh();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-6'
      >
        {loginFields.map((item) => (
          <FormFieldComponent key={item.key} form={form} config={{ ...item }} />
        ))}
        <Button
          type='submit'
          disabled={loading}
          className='w-full bg-[#FF385C] transition-colors hover:bg-linear'
        >
          {/* NOTE: Add Spinner component */}
          {loading ? 'Submitting' : 'Login'}
        </Button>
      </form>
    </Form>
  );
}
