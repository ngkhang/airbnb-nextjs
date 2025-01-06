import React from 'react';

import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

const content = {
  title:
    "We'll call or text you to confirm your number. Standard message and data rates apply.",
  policy: 'Privacy Policy',
};

export function Footer({ className }: Props) {
  return (
    <div
      className={cn(
        'text-balance text-center text-xs text-muted-foreground [&_span]:cursor-pointer [&_span]:underline [&_span]:underline-offset-4 hover:[&_span]:text-primary',
        className
      )}
    >
      <p>
        {content.title} <span>{content.policy}</span>
      </p>
    </div>
  );
}
