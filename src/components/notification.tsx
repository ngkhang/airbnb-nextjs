'use client';

import React from 'react';
import {
  Bounce,
  ToastContainer,
  type ToastContainerProps,
} from 'react-toastify';

const configDefault: ToastContainerProps = {
  position: 'bottom-right',
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
  limit: 3,
};

export default function Notification() {
  return <ToastContainer {...configDefault} />;
}
