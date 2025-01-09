'use client';

import React from 'react';
import type { z } from 'zod';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import type { FormFieldProps, InputFieldProps, InputType } from './form.type';
import { PasswordInput } from '../password-input';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

function renderInput<T extends z.ZodType>({
  field,
  type,
  placeholder,
  options,
}: InputFieldProps<T>): React.ReactNode {
  const output: { [key in InputType]: React.ReactNode } = {
    email: (
      <FormControl>
        <Input type='email' placeholder={placeholder} {...field} />
      </FormControl>
    ),
    text: (
      <FormControl>
        <Input type='text' placeholder={placeholder} {...field} />
      </FormControl>
    ),
    password: (
      <FormControl>
        <PasswordInput placeholder={placeholder} {...field} />
      </FormControl>
    ),
    select: (
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {options?.map((item) => (
            <SelectItem key={item.key} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
  };

  return output[type];
}

export default function FormFieldComponent<T extends z.ZodType>({
  form,
  config,
}: FormFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={config.name}
      render={({ field }) => (
        <FormItem className='grid gap-2'>
          <FormLabel>
            {config.label}
            {config.required && (
              <span className='ml-1 text-sm text-red-500'>*</span>
            )}
          </FormLabel>
          {renderInput({
            field,
            type: config.type,
            placeholder: config.placeholder,
            options: config.options,
          })}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
