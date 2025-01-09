/**
 * Environment variables usage across the application
 */
export const ENV = {
  TOKEN_CYBERSOFT: process.env.NEXT_PUBLIC_TOKEN_CYBERSOFT,
  API_BASE_URL_CYBERSOFT: process.env.NEXT_PUBLIC_API_BASE_URL_CYBERSOFT,
  API_BASE_URL_NEXT_SERVER: process.env.NEXT_PUBLIC_API_BASE_URL_NEXT_SERVER,
} as const;
