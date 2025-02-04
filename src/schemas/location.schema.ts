import { z } from 'zod';

import type { Location } from '@/types/location.type';

export const LocationSchema = z.object({
  tenViTri: z
    .string({ required_error: 'Location name can not be empty.' })
    .refine(
      (value) => !value.match(/^[0-9]+/g),
      'Location name is not starting with number.'
    )
    .refine(
      (value) => value.split(/\s+/g).length >= 2,
      'Enter location name with 2 words, separated by a space.'
    ),
  tinhThanh: z
    .string({ required_error: 'Provide name can not be empty.' })
    .refine(
      (value) => !value.match(/^[0-9]+/g),
      'Provide name is not starting with number.'
    )
    .refine(
      (value) => value.split(/\s+/g).length >= 2,
      'Enter provide name with 2 words, separated by a space.'
    ),
  quocGia: z
    .string({ required_error: 'National name can not be empty.' })
    .refine(
      (value) => !value.match(/^[0-9]+/g),
      'National name is not starting with number.'
    )
    .refine(
      (value) => value.split(/\s+/g).length >= 2,
      'Enter national name with 2 words, separated by a space.'
    ),
  hinhAnh: z.string().optional(),
});

export interface LocationFormType extends z.infer<typeof LocationSchema> {}
