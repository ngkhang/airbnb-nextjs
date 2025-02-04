'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { queryKeys } from '@/constants/queryKeys';
import getQueryClient from '@/lib/get-query-client';
import type { LocationFormType } from '@/schemas/location.schema';
import locationService from '@/services/location.service';

import useNotification from './use-notification';

const queryClient = getQueryClient();

export function useCreateLocation() {
  const router = useRouter();
  const { show } = useNotification();
  const t = useTranslations();

  return useMutation({
    mutationKey: [queryKeys.location, 'create'],
    // Send form data login
    mutationFn: async (formData: LocationFormType) =>
      await locationService.create(formData),
    onSuccess: async () => {
      show(t('feedback.success.createLocation'), {
        type: 'success',
        onClose: () => {
          queryClient.invalidateQueries({ queryKey: [queryKeys.location] });
          router.refresh();
        },
      });
    },
  });
}

export function useDeleteLocation() {
  const router = useRouter();
  const t = useTranslations();
  const { show } = useNotification();

  return useMutation({
    mutationKey: [queryKeys.location, 'delete'],
    mutationFn: async (locationId: number | string) =>
      await locationService.delete(locationId),
    onSuccess: async (result) => {
      show(t('feedback.success.delete'), {
        type: 'success',
        onClose: () => {
          queryClient.invalidateQueries({ queryKey: [queryKeys.location] });
          router.refresh();
        },
      });
    },
  });
}
