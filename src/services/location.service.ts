import { api } from '@/constants/api';
import http from '@/lib/http';
import type { LocationFormType } from '@/schemas/location.schema';
import type { Location } from '@/types/location.type';

const locationService = {
  getAll: async (): Promise<EntitySuccessPayload<Location[]>> => {
    const data = await http.get<EntitySuccessPayload<Location[]>>(
      api.location.getAll
    );
    return data.payload;
  },
  getById: async (
    userId: number | string
  ): Promise<EntitySuccessPayload<Location>> => {
    const data = await http.get<EntitySuccessPayload<Location>>(
      api.location.getById(userId)
    );
    return data.payload;
  },
  create: async (
    body: LocationFormType
  ): Promise<EntitySuccessPayload<Location>> => {
    const data = await http.post<EntitySuccessPayload<Location>>(
      api.location.create,
      body
    );
    return data.payload;
  },
  delete: async (
    locationId: string | number
  ): Promise<EntitySuccessPayload<string>> => {
    const data = await http.delete<EntitySuccessPayload<string>>(
      api.location.delete(locationId)
    );
    return data.payload;
  },
};

export default locationService;
