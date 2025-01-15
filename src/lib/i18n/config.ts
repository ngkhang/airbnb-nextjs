import { z } from 'zod';

/**
 * Supported locales in the application
 * @constant {readonly string[]}
 */
export const locales = ['en', 'vi'] as const;

/**
 * Zod schema for locale validation with detailed error messages
 */
export const localeSchema = z.enum(locales, {
  errorMap: () => {
    return {
      message: `Invalid locale. Supported languages are: ${locales.join(', ')}`,
    };
  },
});

/**
 * Type of Locale derived from the schema
 */
export type Locale = z.infer<typeof localeSchema>;

/**
 * Interface for locale metadata
 */
export interface LocaleMetadata {
  name: string;
  shortName: string;
  nativeName: string;
  flag: string;
  direction?: 'ltr' | 'rtl';
}

/**
 * Detailed locale information mapping
 */
export const localeMetadata: Record<Locale, LocaleMetadata> = {
  en: {
    name: 'English',
    shortName: 'EN',
    nativeName: 'English',
    flag: '🇺🇸',
    direction: 'ltr',
  },
  vi: {
    name: 'Vietnamese',
    shortName: 'VI',
    nativeName: 'Tiếng Việt',
    flag: '🇻🇳',
    direction: 'ltr',
  },
};

/**
 * Configuration for next-intl
 */
export const i18Config: {
  locales: Locale[];
  defaultLocale: Locale;
} = {
  locales: ['en', 'vi'],
  defaultLocale: 'en',
};

/**
 * Helper function to validate a locale
 */
export const validLocale = (locale: string): Locale | null => {
  const { success, data } = localeSchema.safeParse(locale);
  return success ? data : null;
};

/**
 * Get locale metadata for a given locale
 */
export function getLocaleMetadata(locale: Locale): LocaleMetadata {
  return localeMetadata[locale];
}
