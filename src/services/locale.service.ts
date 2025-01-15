'use server';

import { getLocale } from 'next-intl/server';

import { KEY } from '@/constants/key';
import { getCookie, setCookie } from '@/lib/cookies';
import { i18Config, validLocale, type Locale } from '@/lib/i18n/config';

const { LOCALE } = KEY;

/**
 * Get locale from cookie with validation
 */
export const getLocaleFromCookie = async (): Promise<string | null> => {
  const localCookie = getCookie(LOCALE);

  if (!localCookie) return null;

  const data = validLocale(localCookie.value);
  return data;
};

/**
 * Set locale to cookie with validation
 */
export const setLocaleToCookie = async (locale: Locale): Promise<void> => {
  // if (!data) {
  //   throw new Error(`Invalid locale: ${locale}`);
  // }

  try {
    const data = validLocale(locale);
    const loadMessage = (await import(`../locales/${locale}.json`)).default;
    if (data) setCookie(LOCALE, data);
  } catch (error) {
    throw new Error(`Failed to load messages for locale "${locale}". ${error}`);
  }
};

/**
 * Get current locale with type safety
 */
export const getCurrentLocale = async (): Promise<Locale> => {
  const locale = await getLocale();
  const data = validLocale(locale);

  return data || i18Config.defaultLocale;
};
