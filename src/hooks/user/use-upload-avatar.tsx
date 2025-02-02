'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import userService from '@/services/user.service';
import { useUserStore } from '@/stores/userStore';

import useNotification from '../use-notification';

export default function useUploadAvatar() {
  const router = useRouter();
  const { setUser } = useUserStore();
  const { show } = useNotification();
  const t = useTranslations();

  return useMutation({
    mutationKey: ['user', 'uploadAvatar'],
    // Send form data login
    mutationFn: async (formData: File) =>
      await userService.uploadAvatar(formData),
    onSuccess: async (result) => {
      // Set User info into global state
      setUser(result.content);

      // Get notification and redirect to home page
      show(t('feedback.success.updateAvatar'), {
        type: 'success',
        onClose: () => {
          router.refresh();
        },
      });
    },
  });
}
