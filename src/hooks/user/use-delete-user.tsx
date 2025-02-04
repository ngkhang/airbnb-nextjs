'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { queryKeys } from '@/constants/queryKeys';
import getQueryClient from '@/lib/get-query-client';
import userService from '@/services/user.service';

import useNotification from '../use-notification';
const queryClient = getQueryClient();

export default function useDeleteUser() {
  const router = useRouter();
  const t = useTranslations();
  const { show } = useNotification();

  return useMutation({
    mutationKey: [queryKeys.user, 'delete'],
    mutationFn: async (userId: number | string) =>
      await userService.delete(userId),
    onSuccess: async (result) => {
      show(t('feedback.success.delete'), {
        type: 'success',
        onClose: () => {
          queryClient.invalidateQueries({ queryKey: [queryKeys.user] });
          router.refresh();
        },
      });
    },
  });
}
