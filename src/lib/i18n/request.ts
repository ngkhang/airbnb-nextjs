import deepmerge from 'deepmerge';
import { getRequestConfig } from 'next-intl/server';

import { getLocaleFromCookie } from '@/services/locale.service';

import { i18Config, type Locale } from './config';

/**
 * Get messages for a specific locale
 */
async function getMessagesForLocale(
  locale: Locale
): Promise<{ [key: string]: IntlMessages }> {
  try {
    return (await import(`../../locales/${locale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}:`, error);
    return {};
  }
}

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const localeCookie = await getLocaleFromCookie();

  const locale = (() => {
    if (!localeCookie) return i18Config.defaultLocale;
    return localeCookie as Locale;
  })();

  const defaultMessages = await getMessagesForLocale(i18Config.defaultLocale);
  try {
    const localeMessage =
      locale !== i18Config.defaultLocale
        ? await getMessagesForLocale(locale)
        : {};

    const messages = deepmerge(defaultMessages, localeMessage);
    return {
      locale,
      messages,
      timeZone: 'UTC',
    };
  } catch (error) {
    console.error('Failed to load i18n configuration:', error);
    return {
      locale: i18Config.defaultLocale,
      messages: defaultMessages,
    };
  }
});
