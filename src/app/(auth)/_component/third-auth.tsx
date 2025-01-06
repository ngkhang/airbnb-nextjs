import React from 'react';

import Apple from '@/components/icons/apple';
import Google from '@/components/icons/google';
import Meta from '@/components/icons/meta';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const iconAuth = {
  Google: <Google />,
  Apple: <Apple />,
  Meta: <Meta />,
} as const;

const thirdAuth = {
  title: 'or',
  items: [
    {
      key: 0,
      icon: 'Apple',
      srOnly: 'Login with Apple',
    },
    {
      key: 1,
      icon: 'Google',
      srOnly: 'Login with Google',
    },
    {
      key: 2,
      icon: 'Meta',
      srOnly: 'Login with Meta',
    },
  ],
};

interface Props {
  className?: string;
}

export function ThirdAuth({ className }: Props) {
  return (
    <div className={cn('grid gap-6', className)}>
      <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
        <span className='relative z-10 bg-background px-2 text-muted-foreground'>
          {thirdAuth.title}
        </span>
      </div>
      <div className='grid grid-cols-3 gap-4'>
        {thirdAuth.items.map((item) => (
          <Button key={item.key} variant='outline' className='w-full'>
            {iconAuth[item.icon as keyof typeof iconAuth]}
            <span className='sr-only'>{item.srOnly}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
