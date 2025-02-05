'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { queryKeys } from '@/constants/queryKeys';
import getQueryClient from '@/lib/get-query-client';
import bookingService from '@/services/booking.service';
import type { Booking } from '@/types/booking.type';

import useNotification from './use-notification';

const queryClient = getQueryClient();

export function useCreateBooking() {
  const router = useRouter();
  const { show } = useNotification();
  const t = useTranslations();

  return useMutation({
    mutationKey: [queryKeys.booking, 'create'],
    mutationFn: async (formData: Booking) =>
      await bookingService.create(formData),
    onSuccess: async () => {
      show(t('feedback.success.createBooking'), {
        type: 'success',
        onClose: () => {
          queryClient.invalidateQueries({ queryKey: [queryKeys.booking] });
          router.refresh();
        },
      });
    },
  });
}
