import { z } from 'zod';

export const ReserveSchema = z.object({
  maPhong: z.number({ message: 'This is required field' }),
  ngayDen: z.coerce.date({ message: 'This is required field' }),
  ngayDi: z.coerce.date({ message: 'This is required field' }),
  maNguoiDung: z.number({ message: 'This is required field' }),
  soLuongKhach: z.number({ message: 'This is required field' }),
});

export const PreReserveSchema = ReserveSchema.omit({ maNguoiDung: true });

export interface ReserveType extends z.infer<typeof ReserveSchema> {}
export interface PreReserveType extends z.infer<typeof PreReserveSchema> {}
