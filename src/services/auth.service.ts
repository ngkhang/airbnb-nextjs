import { api } from '@/constants/api';
import { ENV } from '@/constants/env';
import type {
  LogInForm,
  LogInResponse,
  RegisterForm,
  RegisterResponse,
} from '@/types/auth.type';
import type { User } from '@/types/user.type';

const tokenCybersoft = ENV.TOKEN_CYBERSOFT || '';

const authService = {
  // NOTE: Write description
  login: async (formData: LogInForm): Promise<LogInResponse> => {
    const result = await fetch(api.auth.login(), {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
        tokenCybersoft: tokenCybersoft,
      },
    });

    const data: LogInResponse = await result.json();

    return data;
  },

  // NOTE: Write description
  register: async (formData: RegisterForm): Promise<RegisterResponse> => {
    const response = await fetch(api.auth.register(), {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
        tokenCybersoft: tokenCybersoft,
      },
    });

    const data: RegisterResponse = await response.json();
    return data;
  },

  // NOTE: Write description
  loginNextServer: async (data: { user: User; token: string }) => {
    const res = await fetch(api.nextServer.login(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  },

  // NOTE: Write description
  logoutNextServer: async () => {
    const res = await fetch(api.nextServer.logout(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: null,
    });
    return await res.json();
  },
};

export default authService;
