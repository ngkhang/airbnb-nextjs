import type {
  ControllerRenderProps,
  FieldPath,
  Path,
  UseFormReturn,
} from 'react-hook-form';
import type { z } from 'zod';

export type InputType = 'text' | 'email' | 'password' | 'select';

export interface InputFieldProps<T extends z.ZodType> {
  field: ControllerRenderProps<T, Path<T>>;
  type: InputType;
  placeholder?: string;
  options?: {
    key: number;
    label: string;
    value: string;
  }[];
}

export interface FieldConfig<T extends z.ZodType>
  extends Omit<InputFieldProps<T>, 'field'> {
  key: number;
  name: FieldPath<z.infer<T>>;
  label: string;
  required: boolean;
}

export interface FormFieldProps<T extends z.ZodType> {
  form: UseFormReturn<z.infer<T>>;
  config: FieldConfig<T>;
}
