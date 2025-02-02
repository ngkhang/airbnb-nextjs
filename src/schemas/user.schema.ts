import { z } from 'zod';

import { RegisterSchema } from './auth.schema';

const PasswordSchema = z
  .string({ message: 'This is required field' })
  .min(4, { message: 'Password must be at least 6 characters.' })
  .max(20, { message: 'Maximum number of characters in password is 50' })
  .refine(
    (value) => /[A-Z]/.test(value),
    'Password must contain at least one uppercase letter'
  )
  .refine(
    (value) => /[a-z]/.test(value),
    'Password must contain at least one lowercase letter'
  )
  .refine(
    (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
    'Password must contain at least one special character'
  );

export const UpdatePasswordSchema = z
  .object({
    currentPassword: PasswordSchema,
    newPassword: PasswordSchema,
    confirmPassword: PasswordSchema,
  })
  .refine(
    ({ newPassword, confirmPassword }) => newPassword === confirmPassword,
    {
      path: ['confirmPassword'],
      message: "Password didn't match.",
    }
  );

export interface UpdatePassword extends z.infer<typeof UpdatePasswordSchema> {}

export const UploadAvatarSchema = z.object({
  avatar: z.instanceof(File),
  // avatar: z.union([z.string(), z.instanceof(File)]).optional(),
});

export interface UploadAvatarType extends z.infer<typeof UploadAvatarSchema> {}

export const UpdateProfileSchema = RegisterSchema.extend({
  id: z.number(),
  phone: z.string().optional(),
  birthday: z.coerce.date().optional(),
  gender: z.string().optional(),
  password: z.string().optional(),
});

export interface UpdateProfileType
  extends z.infer<typeof UpdateProfileSchema> {}
