import { z } from 'zod';

// TODO: Create message with languages
// TODO: Refactor code

export const LoginSchema = z.object({
  email: z.string({ required_error: 'Email can not be empty.' }).email({
    message: 'Please enter a valid email address (Ex: johndoe@domain.com).',
  }),
  password: z
    .string({ required_error: 'Password can not be empty.' })
    .regex(/^.{6,20}$/, { message: 'Minimum 6 and maximum 20 characters.' })
    .regex(/(?=.*[A-Z])/, { message: 'At least one uppercase character.' })
    .regex(/(?=.*[a-z])/, { message: 'At least one lowercase character.' })
    .regex(/(?=.*\d)/, { message: 'At least one digit.' })
    .regex(/[$&+,:;=?@#|'<>.^*()%!-]/, {
      message: 'At least one special character.',
    }),
});

export interface LoginFormType extends z.infer<typeof LoginSchema> {}

export const RegisterSchema = z.object({
  name: z
    .string({ required_error: 'Your name can not be empty.' })
    .refine(
      (value) => !value.match(/^[0-9]+/g),
      'Your full name is not starting with number.'
    )
    .refine(
      (value) => value.split(/\s+/g).length >= 2,
      'Enter your full name with 2 words, separated by a space.'
    ),
  email: z.string({ required_error: 'Email can not be empty.' }).email({
    message: 'Please enter a valid email address (Ex: johndoe@domain.com).',
  }),
  password: z
    .string({ required_error: 'Password can not be empty.' })
    .regex(/^.{6,20}$/, { message: 'Minimum 6 and maximum 20 characters.' })
    .regex(/(?=.*[A-Z])/, { message: 'At least one uppercase character.' })
    .regex(/(?=.*[a-z])/, { message: 'At least one lowercase character.' })
    .regex(/(?=.*\d)/, { message: 'At least one digit.' })
    .regex(/[$&+,:;=?@#|'<>.^*()%!-]/, {
      message: 'At least one special character.',
    }),
  role: z.enum(['USER', 'ADMIN']).default('USER'),
});

export interface RegisterFormType extends z.infer<typeof RegisterSchema> {}
