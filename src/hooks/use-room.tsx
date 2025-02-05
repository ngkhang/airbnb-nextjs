'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { queryKeys } from '@/constants/queryKeys';
import getQueryClient from '@/lib/get-query-client';
import roomService from '@/services/room.service';
import type { Room } from '@/types/room.type';

import useNotification from './use-notification';

const queryClient = getQueryClient();

export function useDeleteRoom() {
  const router = useRouter();
  const t = useTranslations();
  const { show } = useNotification();

  return useMutation({
    mutationKey: [queryKeys.room, 'delete'],
    mutationFn: async (roomId: number | string) =>
      await roomService.delete(roomId),
    onSuccess: async (result) => {
      show(t('feedback.success.delete'), {
        type: 'success',
        onClose: () => {
          queryClient.invalidateQueries({ queryKey: [queryKeys.room] });
          router.refresh();
        },
      });
    },
  });
}

export function useCreateRoom() {
  const router = useRouter();
  const t = useTranslations();
  const { show } = useNotification();

  return useMutation({
    mutationKey: [queryKeys.room, 'create'],
    mutationFn: async (formData: Room) => await roomService.create(formData),
    onSuccess: async (result) => {
      show(t('feedback.success.createRoom'), {
        type: 'success',
        onClose: () => {
          queryClient.invalidateQueries({ queryKey: [queryKeys.room] });
          router.refresh();
        },
      });
    },
  });
}
