import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

const spinnerVariants = cva('flex-col items-center justify-center', {
  variants: {
    show: {
      true: 'flex',
      false: 'hidden',
    },
  },
  defaultVariants: {
    show: true,
  },
});

const loaderVariants = cva('animate-spin', {
  variants: {
    size: {
      sm: 'size-4',
      default: 'size-6',
      md: 'size-8',
      lg: 'size-12',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof loaderVariants>,
    VariantProps<typeof spinnerVariants> {
  className?: string;
}

const Spinner = ({ size, show, className }: SpinnerProps) => (
  <span className={cn(spinnerVariants({ show }))}>
    <Loader2 className={cn(loaderVariants({ size }), className)} />
  </span>
);

Spinner.displayName = 'Spinner';

export default Spinner;
