'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { type UpdateProfileType } from '@/schemas/user.schema';
import userService from '@/services/user.service';
import { useUserStore } from '@/stores/userStore';

import useNotification from '../use-notification';

export default function useUpdateProfile() {
  const router = useRouter();
  const { setUser } = useUserStore();
  const { show } = useNotification();
  const t = useTranslations();

  return useMutation({
    mutationKey: ['user', 'updateProfile'],
    // Send form data login
    mutationFn: async ({
      formData,
      userId,
    }: {
      formData: UpdateProfileType;
      userId: number | string;
    }) => await userService.updateProfile(formData, userId),
    onSuccess: async (result) => {
      // Set User info into global state
      setUser(result.content);

      // Get notification and redirect to home page
      show(t('feedback.success.updateProfile'), {
        type: 'success',
        onClose: () => {
          router.refresh();
        },
      });
    },
  });
}
