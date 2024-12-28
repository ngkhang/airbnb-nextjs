'use client';

import { useRef, useState } from 'react';
import {
  toast,
  type Id,
  type ToastContent,
  type ToastOptions,
} from 'react-toastify';

type NotificationFunction = (
  content?: ToastContent,
  options?: ToastOptions
) => void;

interface NotificationHookResult {
  show: NotificationFunction;
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
   * Shows a loading toast notification
   *
   * @param content - Message to display in the toast
   * @param options - Additional toast options
   */
  const show: NotificationFunction = (
    content = 'Loading...',
    options = {}
  ): void => {
    // If there's an existing toast, update it to error state
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
      type: 'default',
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
  const update = (
    content: ToastContent = 'Success full',
    options: ToastOptions = {}
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
    update,
    isLoading,
  };
}
