'use client';

import Link from 'next/link';

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
import { RegisterSchema, type RegisterFormType } from '@/schemas/auth.schema';

export default function RegisterForm() {
  const form = useZodForm(RegisterSchema, {
    defaultValues: {
      email: '',
      password: '',
      name: '',
      role: 'USER',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: RegisterFormType) {
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
            <FormItem className=''>
              <FormLabel className='text-inherit'>
                Email <span className='text-sm text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder='m@example.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className=''>
              <FormLabel className='text-inherit'>
                Full name <span className='text-sm text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder='' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className=''>
              <div className='flex items-center justify-between'>
                <FormLabel className='text-inherit'>
                  Password <span className='text-sm text-red-500'>*</span>
                </FormLabel>
                <Link
                  href='#'
                  className='text-xs underline-offset-2 hover:underline'
                >
                  Forgot your password?
                </Link>
              </div>
              <FormControl>
                <PasswordInput placeholder='******' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='role'
          render={({ field }) => (
            <FormItem className='hidden'>
              <FormLabel className='text-inherit'>Role</FormLabel>
              <FormControl>
                <Input placeholder='' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
