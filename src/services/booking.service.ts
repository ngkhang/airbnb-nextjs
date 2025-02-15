import { api } from '@/constants/api';
import http from '@/lib/http';
import type { Booking } from '@/types/booking.type';

const bookingService = {
  getHistoryByUserId: async (
    userId: number | string
  ): Promise<EntitySuccessPayload<Booking[]>> => {
    const data = await http.get<EntitySuccessPayload<Booking[]>>(
      api.booking.getByUserId(userId)
    );
    return data.payload;
  },
  create: async (body: Booking): Promise<EntitySuccessPayload<string>> => {
    const data = await http.post<EntitySuccessPayload<string>>(
      api.booking.create,
      body
    );
    return data.payload;
  },
};

export default bookingService;
