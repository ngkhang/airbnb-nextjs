import type { LucideProps } from 'lucide-react';

import { setSizeIcon } from '@/lib/utils';

const Privacy = ({ size, ...props }: LucideProps) => {
  const { width, height } = setSizeIcon(26, 12, size);

  return (
    <svg width={width} height={height} fill='none' {...props}>
      <rect x='0.5' y='0.5' width='25' height='11' rx='5.5' fill='#fff'></rect>
      <path d='M14 1h7a5 5 0 010 10H11l3-10z' fill='#06F'></path>
      <path
        d='M4.5 6.5l1.774 1.774a.25.25 0 00.39-.049L9.5 3.5'
        stroke='#06F'
        strokeLinecap='round'
      ></path>
      <path
        d='M16.5 3.5L19 6m0 0l2.5 2.5M19 6l2.5-2.5M19 6l-2.5 2.5'
        stroke='#fff'
        strokeLinecap='round'
      ></path>
      <rect
        x='0.5'
        y='0.5'
        width='25'
        height='11'
        rx='5.5'
        stroke='#06F'
      ></rect>
    </svg>
  );
};

Privacy.displayName = 'Privacy';

export default Privacy;
