import { cookies } from 'next/headers';

interface RequestCookie {
  name: string;
  value: string;
}

/**
 * Set a cookie with optional expiration
 *
 * @param {string} key - Cookie key
 * @param {string} value - Cookie value
 */
export const setCookie = (key: string, value: string) => {
  cookies().set(key, value, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
  });
};

/**
 * Retrieve the value of cookie
 *
 * @param {string} key - Cookie key to retrieve
 * @return {RequestCookie |undefined} The cookie object or undefined if not found
 */
export const getCookie = (key: string): RequestCookie | undefined =>
  cookies().get(key);

/**
 * Delete a specific cookie
 *
 * @param {string} key - Cookie key to delete
 */
export const removeCookie = (key: string) => cookies().delete(key);
