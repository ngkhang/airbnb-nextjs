import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const setSizeIcon = (
  defaultWidth: number,
  defaultHeight: number,
  size?: number | string
) => {
  let width = defaultWidth;
  let height = defaultHeight;
  const aspectRatio = width / height;

  if (size) {
    height = Number(size);
    width = aspectRatio * height;
  }

  return { width, height };
};
