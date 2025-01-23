'use client';
// FIXME: Icon delay when switch status
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import {
  Bounce,
  ToastContainer,
  type ToastContainerProps,
} from 'react-toastify';

import { cn } from '@/lib/utils';

import Icon from './icons/icon';
import Spinner from './icons/spinner';

const configDefault: ToastContainerProps = {
  position: 'top-right',
  theme: 'light',
  autoClose: 3000,
  hideProgressBar: false,
  newestOnTop: false,
  rtl: false,
  transition: Bounce,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  closeButton: true,
  limit: 3,
};

const notificationVariants = cva(
  'left-[env(safe-area-inset-left)] top-[var(--toastify-toast-top)] w-screen px-4 sm:bottom-0 sm:top-[unset] md:left-[unset] md:right-[var(--toastify-toast-right)] md:top-[unset] md:w-fit md:px-0 [&>div]:w-full [&>div]:md:w-80 [&>div]:2xl:w-96'
);

export interface NotificationProps
  extends VariantProps<typeof notificationVariants> {
  className?: string;
}

const Notification = ({ className }: NotificationProps) => (
  <ToastContainer
    {...configDefault}
    className={cn(notificationVariants(), className)}
    icon={({ type }) => {
      switch (type) {
        case 'info':
          return <Spinner />;
        case 'success':
          return <Icon name='success' color='green' />;
        case 'warning':
          return <Icon name='warning' color='yellow' />;
        case 'error':
          return <Icon name='error' color='red' />;
        default:
          return null;
      }
    }}
  />
);

Notification.display = 'Notification';

export default Notification;
