import { z } from 'zod';

export const RoomFormSchema = z.object({
  tenPhong: z
    .string({ required_error: 'Room name can not be empty.' })
    .refine(
      (value) => !value.match(/^[0-9]+/g),
      'Room name is not starting with number.'
    )
    .refine(
      (value) => value.split(/\s+/g).length >= 2,
      'Enter room name with 2 words, separated by a space.'
    ),
  khach: z
    .string({ message: 'This is required field' })
    .min(1, { message: 'Number of guest must be at least 1' }),
  phongNgu: z
    .string({ message: 'This is required field' })
    .min(1, { message: 'Bedroom must be at least 1' }),
  giuong: z
    .string({ message: 'This is required field' })
    .min(1, { message: 'Bed must be at least 1' }),
  phongTam: z.string({ message: 'This is required field' }),
  giaTien: z.string({ message: 'This is required field' }).min(1),
  moTa: z.string().optional(),
  maViTri: z.string({ message: 'This is required field' }),
  hinhAnh: z.string().optional(),
  equipments: z.array(z.string()),
});

export interface RoomForm extends z.infer<typeof RoomFormSchema> {}
