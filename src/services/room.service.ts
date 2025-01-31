import { api } from '@/constants/api';
import http from '@/lib/http';
import type { Room } from '@/types/room.type';

const roomService = {
  getAll: async (): Promise<EntitySuccessPayload<Room[]>> => {
    const data = await http.get<EntitySuccessPayload<Room[]>>(api.rooms.getAll);
    return data.payload;
  },
  getByLocationId: async (
    locationId: number | string
  ): Promise<EntitySuccessPayload<Room[]>> => {
    const data = await http.get<EntitySuccessPayload<Room[]>>(
      api.rooms.getByLocationId(locationId)
    );
    return data.payload;
  },
  getByRoomId: async (
    roomId: number | string
  ): Promise<EntitySuccessPayload<Room>> => {
    const data = await http.get<EntitySuccessPayload<Room>>(
      api.rooms.getById(roomId)
    );
    return data.payload;
  },
};

export default roomService;
