'use client';

import {
  CircleAlert,
  CircleCheck,
  CircleX,
  Info,
  Globe,
  EyeIcon,
  EyeOffIcon,
  Menu,
  CircleUserRound,
  Search,
  Minus,
  Plus,
  SlidersHorizontal,
  Heart,
  Star,
  ImageOff,
  type LucideProps,
} from 'lucide-react';

import Airbnb from './airbnb';
import AirbnbBlack from './airbnb-black';
import AirbnbSymbol from './airbnb-symbol';
import Apple from './apple';
import Facebook from './facebook';
import Google from './google';
import Instagram from './instagram';
import Meta from './meta';
import Privacy from './privacy';
import Vnd from './vnd';
import X from './x';

const IconComponents = {
  info: Info,
  success: CircleCheck,
  warning: CircleAlert,
  error: CircleX,
  globe: Globe,
  eye: EyeIcon,
  eyeOff: EyeOffIcon,
  menu: Menu,
  user: CircleUserRound,
  search: Search,
  minus: Minus,
  plus: Plus,
  slidersHorizontal: SlidersHorizontal,
  heart: Heart,
  star: Star,
  imageOff: ImageOff,
  airbnb: Airbnb,
  airbnbBlack: AirbnbBlack,
  airbnbSymbol: AirbnbSymbol,
  apple: Apple,
  meta: Meta,
  google: Google,
  privacy: Privacy,
  x: X,
  facebook: Facebook,
  instagram: Instagram,
  vnd: Vnd,
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
