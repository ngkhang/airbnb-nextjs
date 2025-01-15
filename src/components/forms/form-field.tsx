'use client';

import { clsx } from 'clsx';
import React from 'react';
import type {
  ControllerRenderProps,
  FieldPath,
  Path,
  UseFormReturn,
} from 'react-hook-form';
import type { z } from 'zod';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { PasswordInput } from '../password-input';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export type InputType = 'text' | 'email' | 'password' | 'select';
export interface SelectOption {
  value: string;
  label: string;
}
export interface InputFieldProps<T extends z.ZodType> {
  field: ControllerRenderProps<T, Path<T>>;
  type: InputType;
  placeholder?: string;
  options?: SelectOption[];
}

export interface ConfigFormField<T extends z.ZodType> {
  name: FieldPath<z.infer<T>>;
  required: boolean;
  isShow: boolean;
  type: InputType;
  optionsVal?: {
    [key: string]: string;
  };
}

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
      <Select
        onValueChange={field.onChange}
        value={field.value}
        defaultValue={field.value}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={placeholder}>
              {
                options?.find((opt) => opt.value.toLowerCase() === field.value)
                  ?.label
              }
            </SelectValue>
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {options?.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
  };

  return output[type];
}

export interface FormFieldProps<T extends z.ZodType> {
  form: UseFormReturn<z.infer<T>>;
  config: {
    name: FieldPath<z.infer<T>>;
    label: string;
    required: boolean;
    isShow: boolean;
    type: InputType;
    placeholder?: string;
    options?: SelectOption[];
  };
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
        <FormItem className={clsx('grid gap-2', !config.isShow && 'hidden')}>
          <FormLabel>
            {config.label}
            {config.required && (
              <span className='ml-1 text-sm text-red-500'>*</span>
            )}
          </FormLabel>
          {renderInput({
            field,
            ...config,
          })}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
