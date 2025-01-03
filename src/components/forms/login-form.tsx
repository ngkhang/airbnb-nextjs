import React from 'react';

import { PasswordInput } from '@/components/password-input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useZodForm from '@/hooks/use-zod-form';
import { LoginSchema, type LoginFormType } from '@/schemas/auth.schema';

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
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='grid gap-2'>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='m@example.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='grid gap-2'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='******' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
