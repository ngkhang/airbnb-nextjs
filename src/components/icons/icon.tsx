'use client';

import {
  CircleAlert,
  CircleCheck,
  CircleX,
  Info,
  EyeIcon,
  EyeOffIcon,
  type LucideProps,
} from 'lucide-react';

import Airbnb from './airbnb';
import AirbnbBlack from './airbnb-black';
import AirbnbSymbol from './airbnb-symbol';
import Apple from './apple';
import Google from './google';
import Meta from './meta';

const IconComponents = {
  info: Info,
  success: CircleCheck,
  warning: CircleAlert,
  error: CircleX,
  eye: EyeIcon,
  eyeOff: EyeOffIcon,
  airbnb: Airbnb,
  airbnbBlack: AirbnbBlack,
  airbnbSymbol: AirbnbSymbol,
  apple: Apple,
  meta: Meta,
  google: Google,
} as const;

export type IconName = keyof typeof IconComponents;

interface IconProps extends LucideProps {
  name: IconName;
}

const Icon = ({ name, ...props }: IconProps) => {
  const IconComponent = IconComponents[name];

  return <IconComponent {...props} />;
};

Icon.displayName = 'Icon';

export default Icon;
