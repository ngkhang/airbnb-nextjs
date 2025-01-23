import type { LucideProps } from 'lucide-react';

import { setSizeIcon } from '@/lib/utils';

const Vnd = ({ size, ...props }: LucideProps) => {
  const { width, height } = setSizeIcon(24, 24, size);

  return (
    <svg
      stroke='currentColor'
      fill='currentColor'
      strokeWidth='0'
      viewBox='0 0 384 512'
      height={height}
      width={width}
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M288 32c-17.7 0-32 14.3-32 32l-32 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l32 0 0 49.1c-18.8-10.9-40.7-17.1-64-17.1c-70.7 0-128 57.3-128 128s57.3 128 128 128c24.5 0 47.4-6.9 66.8-18.8c5 11.1 16.2 18.8 29.2 18.8c17.7 0 32-14.3 32-32l0-96 0-160c17.7 0 32-14.3 32-32s-14.3-32-32-32c0-17.7-14.3-32-32-32zM128 288a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM32 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l320 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 448z'></path>
    </svg>
  );
};

Vnd.displayName = 'Vnd';

export default Vnd;
