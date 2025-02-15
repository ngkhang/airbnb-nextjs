/* eslint-disable no-undefined */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from 'clsx';
import { format, isValid, parse, parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';

import { EntityError } from './http';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculates icon dimensions while maintaining aspect ratio
 *
 * @param defaultWidth - Original width of the icon
 * @param defaultHeight - Original height of the icon
 * @param size - Optional new size (applied to height)
 * @returns Object containing calculated width and height
 */
export const setSizeIcon = (
  defaultWidth: number,
  defaultHeight: number,
  size?: number | string
): { width: number; height: number } => {
  if (defaultWidth <= 0 || defaultHeight <= 0) {
    throw new Error('Default dimensions must be positive numbers');
  }

  if (!size)
    return {
      width: defaultWidth,
      height: defaultHeight,
    };

  const aspectRatio = defaultWidth / defaultHeight;
  const newHeight = Number(size);

  if (isNaN(newHeight) || newHeight <= 0) {
    throw new Error('Size must be a positive number');
  }

  return {
    height: newHeight,
    width: Math.round(aspectRatio * newHeight * 100) / 100,
  };
};

interface ErrorHandlerOptions {
  duration?: number;
  fallbackMessage?: string;
}
/**
 * Handles API errors and displays appropriate toast notifications
 *
 * @param error - Error object from API call
 * @param options - Configuration options for error handling
 */
export const handleErrorApi = (
  error: unknown,
  options: ErrorHandlerOptions = {}
): void => {
  const { fallbackMessage = 'An unexpected error occurred' } = options;

  if (error instanceof EntityError) {
    toast.error(error.payload.content, {
      autoClose: options.duration,
    });
  } else {
    // Fallback for unknown error types
    toast.error(fallbackMessage, {
      autoClose: options.duration,
    });
  }
};

/**
 * Normalizes a path by removing leading slashes
 *
 * @param path - URL path to normalize
 * @return Normalized path without leading slash
 */
export const normalizePath = (path: string): string =>
  path.startsWith('/') ? path.replace(/^\/+/, '') : path;

/**
 * Convert currency from USD to VND
 *
 * @param {number} usd - The currency is USD unit
 * @param {number} exchangeRate - Description
 * @return {string} The string has VND currency format
 */
export const formatCurrency = (
  usd: number,
  exchangeRate: number = 24_000
): string => {
  const formatter = new Intl.NumberFormat('en-US', {});

  return formatter.format(usd * exchangeRate);
};

export const parseBirthday = (
  birthday: string | Date | null | undefined
): Date | undefined => {
  // Handle null, undefined, or empty string
  if (!birthday || birthday === '' || birthday === 'Invalid Date') {
    return undefined;
  }

  // If already a Date object, return it if valid
  if (birthday instanceof Date) {
    return isValid(birthday) ? birthday : undefined;
  }

  // Try parsing different date formats
  const formats = [
    // DD/MM/YYYY format (your local format)
    () => parse(birthday, 'dd/MM/yyyy', new Date()),

    // ISO 8601 format
    () => parseISO(birthday),

    // Attempt to create Date object directly
    () => new Date(birthday),
  ];

  for (const parseFunc of formats) {
    try {
      const parsed = parseFunc();
      if (isValid(parsed)) {
        return parsed;
      }
    } catch {
      continue;
    }
  }

  // If no valid date found
  return undefined;
};

// Utility for formatting display
export const formatBirthday = (
  birthday: Date | string | null | undefined
): string => {
  const parsed = parseBirthday(birthday);
  return parsed ? format(parsed, 'dd/MM/yyyy') : 'Not specified';
};
