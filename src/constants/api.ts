import { ENV } from './env';

const { API_BASE_URL_CYBERSOFT, API_BASE_URL_NEXT_SERVER } = ENV;

export const api = {
  auth: {
    login: () => `${API_BASE_URL_CYBERSOFT}/auth/signin`,
    register: () => `${API_BASE_URL_CYBERSOFT}/auth/signup`,
  },
  nextServer: {
    login: () => `${API_BASE_URL_NEXT_SERVER}/auth/login`,
    logout: () => `${API_BASE_URL_NEXT_SERVER}/auth/logout`,
  },
};
