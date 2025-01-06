'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useZodForm from '@/hooks/use-zod-form';
import { LoginSchema, type LoginFormType } from '@/schemas/auth.schema';

import FormFieldComponent from './form-field';
import type { FieldConfig } from './form.type';

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
  const form = useZodForm(LoginSchema, {
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: LoginFormType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
          className='w-full bg-[#FF385C] transition-colors hover:bg-linear'
        >
          Login
        </Button>
      </form>
    </Form>
  );
}
