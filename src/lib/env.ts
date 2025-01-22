/**
 * Environment variables usage across the application
 */
import { z } from 'zod';

const EnvSchema = z.object({
  TOKEN_CYBERSOFT: z.string(),
  API_BASE_URL_CYBERSOFT: z.string(),
  API_BASE_URL_NEXT_SERVER: z.string(),
});

const envValid = EnvSchema.safeParse({
  TOKEN_CYBERSOFT: process.env.NEXT_PUBLIC_TOKEN_CYBERSOFT,
  API_BASE_URL_CYBERSOFT: process.env.NEXT_PUBLIC_API_BASE_URL_CYBERSOFT,
  API_BASE_URL_NEXT_SERVER: process.env.NEXT_PUBLIC_API_BASE_URL_NEXT_SERVER,
});

if (envValid.error) {
  console.log(envValid.error.issues);
  throw new Error('Các giá trị khai báo trong file .env không hợp lệ');
}

const envConfig = envValid.data;
export default envConfig;
