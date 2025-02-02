'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { DataTable } from '@/components/table/data-table';
import { queryKeys } from '@/constants/queryKeys';
import bookingService from '@/services/booking.service';
import { useUserStore } from '@/stores/userStore';

import { defaultColumns } from './columns-reservation';

export default function ReservationHistoryPage() {
  const t = useTranslations();
  const { user } = useUserStore();
  const { data } = useQuery({
    queryKey: [queryKeys.booking, user?.id],
    queryFn: () => user && bookingService.getHistoryByUserId(user.id),
    enabled: !!user?.id,
  });

  return (
    <div className='grid gap-4'>
      {/* Title */}
      <div>
        <h2 className='mb-3 text-3xl font-semibold'>
          {t('pages.user.reservationHistory.title')}
        </h2>
        <p className='text-sm'>
          {t('pages.user.reservationHistory.description')}
        </p>
      </div>

      {/* Main */}
      {data && <DataTable columns={defaultColumns} data={data.content} />}
    </div>
  );
}
