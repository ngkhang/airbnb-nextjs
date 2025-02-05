'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';

interface DrawerDialogProps {
  title: string;
  description?: string;
  button: {
    title: string;
    className?: string;
  };
  width?: string;
  children: React.ReactNode;
}

export default function DrawerDialog({
  title,
  description = '',
  children,
  button,
  width = '',
}: DrawerDialogProps) {
  const [open, setOpen] = useState<boolean>(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='outline' className={cn(button.className)}>
            {button.title}
          </Button>
        </DialogTrigger>
        <DialogContent
          className={cn('h-2/3 overflow-y-scroll sm:max-w-[425px]', width)}
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen} direction='bottom'>
      <DrawerTrigger asChild>
        <Button variant='outline' className={cn(button.className)}>
          {button.title}
        </Button>
      </DrawerTrigger>
      <DrawerContent className='mt-14'>
        <DrawerHeader className='text-left'>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>

        <div className='px-4'>{children}</div>
        <DrawerFooter className='pt-2'>
          <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
