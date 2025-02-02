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
  ChevronLeft,
  ChevronsLeft,
  ChevronRight,
  ChevronsRight,
  ChevronDown,
  CloudUpload,
  AirVent,
  Wifi,
  WavesLadder,
  ShieldCheck,
  Check,
  Dot,
  Flag,
  BadgeCheck,
  CreditCard,
  Settings,
  LogOut,
  GraduationCap,
  BriefcaseBusiness,
  Music,
  Sparkles,
  PawPrint,
  Languages,
  BookOpen,
  HandPlatter,
  Utensils,
  Shield,
  LockKeyhole,
  ArrowUpDown,
  IdCard,
  StickyNote,
  Megaphone,
  Settings2,
  ChartNoAxesColumn,
  Gift,
  CalendarIcon,
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
  chevronLeft: ChevronLeft,
  chevronsLeft: ChevronsLeft,
  chevronRight: ChevronRight,
  chevronsRight: ChevronsRight,
  chevronDown: ChevronDown,
  cloudUpload: CloudUpload,
  airVent: AirVent,
  wifi: Wifi,
  wavesLadder: WavesLadder,
  shieldCheck: ShieldCheck,
  check: Check,
  dot: Dot,
  flag: Flag,
  badgeCheck: BadgeCheck,
  creditCard: CreditCard,
  settings: Settings,
  logOut: LogOut,
  graduationCap: GraduationCap,
  briefcaseBusiness: BriefcaseBusiness,
  music: Music,
  sparkles: Sparkles,
  pawPrint: PawPrint,
  languages: Languages,
  bookOpen: BookOpen,
  handPlatter: HandPlatter,
  utensils: Utensils,
  shield: Shield,
  lockKeyhole: LockKeyhole,
  arrowUpDown: ArrowUpDown,
  idCard: IdCard,
  stickyNote: StickyNote,
  megaphone: Megaphone,
  settings2: Settings2,
  chartNoAxesColumn: ChartNoAxesColumn,
  gift: Gift,
  calendarIcon: CalendarIcon,
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
