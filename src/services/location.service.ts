import { api } from '@/constants/api';
import http from '@/lib/http';
import type { Location } from '@/types/location.type';

const locationService = {
  getAll: async (): Promise<EntitySuccessPayload<Location[]>> => {
    const data = await http.get<EntitySuccessPayload<Location[]>>(
      api.location.getAll
    );
    return data.payload;
  },
};

export default locationService;
