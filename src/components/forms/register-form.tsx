'use client';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useZodForm from '@/hooks/use-zod-form';
import { RegisterSchema, type RegisterFormType } from '@/schemas/auth.schema';

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
