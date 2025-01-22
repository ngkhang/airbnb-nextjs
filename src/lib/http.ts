/* eslint-disable @typescript-eslint/no-explicit-any */
import { KEY } from '@/constants/key';
import envConfig from '@/lib/env';

import { normalizePath } from './utils';

interface CustomOptions extends Omit<RequestInit, 'method'> {
  baseURL?: string;
}

export class EntityError extends Error {
  public status: number;
  public payload: EntityErrorPayload;

  constructor({
    status,
    payload,
  }: {
    status: number;
    payload: EntityErrorPayload;
  }) {
    super('Http Error');
    this.status = status;
    this.payload = payload;
  }
}

/**
 * Request Config
 *
 */
const request = async <Response>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  url: string,
  options?: CustomOptions
): Promise<{ status: number; payload: Response }> => {
  const body: FormData | string | undefined =
    options?.body instanceof FormData
      ? options.body
      : JSON.stringify(options?.body);

  const baseHeaders: { [key: string]: string } =
    body instanceof FormData
      ? {}
      : {
          'Content-Type': 'application/json',
          [KEY.TOKEN_CYBERSOFT]: envConfig.TOKEN_CYBERSOFT || '',
        };

  const baseURL = options?.baseURL ?? envConfig.API_BASE_URL_CYBERSOFT;
  const fullUrl = `${baseURL}/${normalizePath(url)}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    body,
    method,
  });

  const payload: Response = await res.json();
  const data = {
    status: res.status,
    payload,
  };

  if (!res.ok) {
    throw new EntityError(
      data as {
        status: number;
        payload: EntityErrorPayload;
      }
    );
  }

  return data;
};

/**
 * Http Instance
 *
 */
const http = {
  get<Response>(url: string, options?: Omit<CustomOptions, 'body'>) {
    return request<Response>('GET', url, options);
  },

  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('POST', url, { ...options, body });
  },
  put<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'>) {
    return request<Response>('PUT', url, { ...options, body });
  },
  delete<Response>(url: string, options?: Omit<CustomOptions, 'body'>) {
    return request<Response>('DELETE', url, { ...options });
  },
};

export default http;
