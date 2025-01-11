'use client';

import {
  CircleAlert,
  CircleCheck,
  CircleX,
  Info,
  type LucideProps,
} from 'lucide-react';

import Airbnb from './airbnb';
import AirbnbBlack from './airbnb-black';
import AirbnbSymbol from './airbnb-symbol';
import Apple from './apple';
import Google from './google';
import Meta from './meta';
import Spinner from './spinner';

const Icon = {
  info: Info,
  success: CircleCheck,
  warning: CircleAlert,
  error: CircleX,
  Spinner,
  airbnb: (props: LucideProps) => Airbnb(props),
  airbnbBlack: (props: LucideProps) => AirbnbBlack(props),
  airbnbSymbol: (props: LucideProps) => AirbnbSymbol(props),
  apple: (props: LucideProps) => Apple(props),
  meta: (props: LucideProps) => Meta(props),
  google: (props: LucideProps) => Google(props),
};

export type IconName = keyof typeof Icon;

export default Icon;
