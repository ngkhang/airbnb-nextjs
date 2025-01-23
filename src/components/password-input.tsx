'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

import Icon from './icons/icon';
import { Button } from './ui/button';
import { Input, type InputProps } from './ui/input';

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [show, setShow] = React.useState<boolean>(false);
    const disabled =
      props.value === '' || props.value === null || props.disabled;

    return (
      <div className='[&_input]:-ms-reveal relative'>
        <Input
          type={show ? 'text' : 'password'}
          ref={ref}
          className={cn(
            'pr-10 [&::-ms-clear]:invisible [&::-ms-clear]:hidden [&::-ms-clear]:cursor-none [&::-ms-reveal]:invisible [&::-ms-reveal]:hidden [&::-ms-reveal]:cursor-none',
            className
          )}
          {...props}
        />
        <Button
          type='button'
          variant='ghost'
          size='sm'
          className='absolute right-0 top-1/2 -translate-y-1/2 p-3 hover:bg-transparent'
          disabled={disabled}
          onClick={() => setShow((prev) => !prev)}
        >
          <Icon
            name={show && !disabled ? 'eye' : 'eyeOff'}
            className='size-4'
            aria-hidden='true'
          />

          <span className='sr-only'>
            {show ? 'Hide password' : 'Show password'}
          </span>
        </Button>
      </div>
    );
  }
);

PasswordInput.displayName = 'Input';

export { PasswordInput };
