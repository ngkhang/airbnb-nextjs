'use client';

// NOTE: Refactor follow to component of shadcn/ui
import { type LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import dynamic from 'next/dynamic';

const BASE_ICON_SIZE = 24;

import { cn } from '@/lib/utils';

import Airbnb from './airbnb';
import AirbnbSymbol from './airbnb-symbol';
import Spinner from './spinner';

const createLucideIconMapping = <
  T extends Record<string, keyof typeof dynamicIconImports>,
>(
  mapping: T
): T => mapping;

const setSize = (type: 'square' | 'landscape', size?: string | number) => {
  if (type === 'square') {
    return {
      width: size || BASE_ICON_SIZE,
      height: size || BASE_ICON_SIZE,
    };
  }

  return {
    width: size || '',
    height: size ? 'fit-content' : '',
  };
};

export const localIcons = {
  airbnb: Airbnb,
  airbnbBlack: () => <Airbnb className='[&>path]:fill-current' />,
  airbnbSymbol: AirbnbSymbol,
  spinner: Spinner,
} as const;

export const lucideIcons = createLucideIconMapping({
  info: 'info',
  success: 'circle-check',
  warning: 'circle-alert',
  error: 'circle-x',
});

type LocalIconName = keyof typeof localIcons;
type LucideIconName = keyof typeof lucideIcons;
export type IconName = LocalIconName | LucideIconName | '';

interface IconProps extends Omit<LucideProps, 'ref' | 'name'> {
  name?: IconName;
  size?: number | string;
  type?: 'square' | 'landscape';
}

const Icon = ({
  name,
  size,
  type = 'square',
  className,
  ...props
}: IconProps) => {
  if (!name) return null;

  const LocalIcon = localIcons[name as LocalIconName];
  if (LocalIcon) {
    const { width, height } = setSize(type, size);
    return (
      <div
        className={cn(className)}
        style={{
          width,
          height,
        }}
      >
        <LocalIcon
          className='h-full w-full'
          preserveAspectRatio='xMidYMid meet'
        />
      </div>
    );
  }

  const iconName = lucideIcons[name as LucideIconName];
  const LucideIcon = dynamic(dynamicIconImports[iconName]);
  return <LucideIcon size={size || BASE_ICON_SIZE} {...props} />;
};

export default Icon;
