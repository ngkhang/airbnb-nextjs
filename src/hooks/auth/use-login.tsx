'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { useAuthContext } from '@/components/providers/auth.provider';
import ROUTES from '@/constants/routes';
import type { LoginFormType } from '@/schemas/auth.schema';
import authService from '@/services/auth.service';

import useNotification from '../use-notification';

export default function useLogin() {
  const { setUser } = useAuthContext();
  const router = useRouter();
  const { show } = useNotification();
  const t = useTranslations();

  return useMutation({
    mutationKey: ['auth', 'login'],
    // Send form data login
    mutationFn: async (formData: LoginFormType) =>
      await authService.login(formData),
    onSuccess: async (result) => {
      // Set token and role in cookie (using to Server component)
      await authService.loginNextServer(result.content);
      // Set User info into global state
      setUser(result.content.user);

      // Get notification and redirect to home page
      show(t('feedback.success.login'), {
        type: 'success',
        onClose: () => {
          router.push(ROUTES.HOME);
          // router.refresh();
        },
      });
    },
  });
}
