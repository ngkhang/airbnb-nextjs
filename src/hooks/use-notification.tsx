'use client';

import { useRef, useState } from 'react';
import {
  toast,
  type Id,
  type ToastContent,
  type ToastOptions,
} from 'react-toastify';

type NotificationFunction = (
  content: ToastContent,
  options?: ToastOptions
) => void;

interface NotificationHookResult {
  show: NotificationFunction;
  loading: NotificationFunction;
  update: NotificationFunction;
  isLoading: boolean;
}

/**
 * Custom hook for managing toast notifications using react-toastify
 *
 * @returns {NotificationHookResult} Object containing show and update functions, and loading state
 * @package react-toastify
 * @link https://fkhadra.github.io/react-toastify/introduction/
 */
export default function useNotification(): NotificationHookResult {
  const toastId = useRef<Id | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Shows notification with content
   *
   * @param content - Message to display in the toast
   * @param options - Additional toast options
   */
  const show: NotificationFunction = (content, options): void => {
    toast(content, {
      type: 'default',
      hideProgressBar: true,
      isLoading: false,
      ...options,
    });
  };

  /**
   * Shows a loading toast notification
   *
   * @param content - Message to display in the toast
   * @param options - Additional toast options
   */
  const loading: NotificationFunction = (
    content = 'Loading...',
    options
  ): void => {
    if (toastId.current && isLoading) {
      toast.update(toastId.current, {
        render: 'Previous operation cancelled',
        type: 'error',
        isLoading: false,
        autoClose: 2000,
      });
    }

    setIsLoading(true);
    toastId.current = toast.loading(content, {
      type: 'info',
      autoClose: false,
      closeButton: false,
      ...options,
    });
  };

  /**
   * Updates an existing toast notification
   *
   * @param content  New message to display
   * @param options - Additional toast options
   */
  const update: NotificationFunction = (
    content = 'Successful!',
    options
  ): void => {
    if (!toastId.current) return;

    toast.update(toastId.current, {
      render: content,
      type: 'default',
      autoClose: 2000,
      isLoading: false,
      closeButton: true,
      ...options,
      onClose: () => {
        setIsLoading(false);
        toastId.current = null;
      },
    });
  };

  return {
    show,
    loading,
    update,
    isLoading,
  };
}
