'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { queryKeys } from '@/constants/queryKeys';
import ROUTES from '@/constants/routes';
import getQueryClient from '@/lib/get-query-client';
import type { RegisterFormType } from '@/schemas/auth.schema';
import authService from '@/services/auth.service';

import useNotification from '../use-notification';

const queryClient = getQueryClient();

export default function useRegister() {
  const router = useRouter();
  const { show } = useNotification();
  const t = useTranslations();

  return useMutation({
    mutationKey: [queryKeys.user, 'register'],
    // Send form data login
    mutationFn: async (formData: RegisterFormType) =>
      await authService.register(formData),
    onSuccess: async () => {
      // Get notification and redirect to login page
      show(t('feedback.success.register'), {
        type: 'success',
        onClose: () => {
          queryClient.invalidateQueries({ queryKey: [queryKeys.user] });
          router.push(ROUTES.AUTH.LOGIN);
          router.refresh();
        },
      });
    },
  });
}
