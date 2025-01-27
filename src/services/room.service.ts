import { api } from '@/constants/api';
import http from '@/lib/http';
import type { Room } from '@/types/room.type';

const roomService = {
  getAll: async (): Promise<EntitySuccessPayload<Room[]>> => {
    const data = await http.get<EntitySuccessPayload<Room[]>>(api.rooms.getAll);
    return data.payload;
  },
};

export default roomService;
