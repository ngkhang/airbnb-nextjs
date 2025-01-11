import { zodResolver } from '@hookform/resolvers/zod';
import {
  useForm,
  type UseFormProps,
  type UseFormReturn,
} from 'react-hook-form';
import type { z } from 'zod';

type UseZodFormType = <T extends z.ZodType>(
  _schema: T,
  _options?: Omit<UseFormProps<z.infer<T>>, 'resolver'>
) => UseFormReturn<z.infer<T>>;

const useZodForm: UseZodFormType = (schema, options = {}) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    ...options,
  });
  return form;
};

export default useZodForm;
