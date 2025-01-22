import { api } from '@/constants/api';
import envConfig from '@/lib/env';
import http from '@/lib/http';
import type { LoginFormType, RegisterFormType } from '@/schemas/auth.schema';
import type { LoginServiceRes, RegisterServiceRes } from '@/types/auth.type';
import type { LoginResType } from '@/types/user.type';

const authService = {
  login: async (body: LoginFormType): Promise<LoginServiceRes> => {
    const data = await http.post<LoginServiceRes>(api.auth.login, body);
    return data.payload;
  },

  register: async (body: RegisterFormType): Promise<RegisterServiceRes> => {
    const data = await http.post<RegisterServiceRes>(api.auth.register, body);
    return data.payload;
  },

  loginNextServer: async (body: LoginResType) => {
    const data = await http.post(api.nextServer.login, body, {
      baseURL: envConfig.API_BASE_URL_NEXT_SERVER,
    });
    return data.payload;
  },

  logoutNextServer: async () => {
    const data = await http.post(
      api.nextServer.logout,
      {},
      {
        baseURL: envConfig.API_BASE_URL_NEXT_SERVER,
      }
    );

    return data.payload;
  },
};

export default authService;
