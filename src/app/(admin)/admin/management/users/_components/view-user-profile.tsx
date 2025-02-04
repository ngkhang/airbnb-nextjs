'use client';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import Spinner from '@/components/icons/spinner';
import { Separator } from '@/components/ui/separator';
import { queryKeys } from '@/constants/queryKeys';
import userService from '@/services/user.service';
import type { User } from '@/types/user.type';

const keyMap = {
  profileUser: {
    fields: ['name', 'email', 'phone', 'birthday', 'gender'],
  },
} as const;

export default function ViewUserForm({ userId }: { userId: string | number }) {
  const { data: userInfo, isPending } = useQuery({
    queryKey: [queryKeys.user, userId],
    queryFn: () => userService.getById(userId),
    enabled: !!userId,
  });

  const t = useTranslations();

  if (isPending) {
    return (
      <div className='display-center py-8'>
        <Spinner className='text-brand' size='lg' />
      </div>
    );
  }

  return (
    <div>
      {userInfo && (
        <div className='grid gap-2'>
          {keyMap.profileUser.fields.map((key, index) => (
            <div key={key} className='font-medium'>
              {index !== 0 && <Separator className='my-5' />}
              <p className='mb-1'>
                {t(`pages.user.profileInfo.fields.${key}.title`)}
              </p>
              {key === 'gender' ? (
                <p className='text-muted-foreground'>
                  {userInfo.content[key as keyof User] ? 'Male' : 'Female'}
                </p>
              ) : (
                <p className='text-muted-foreground'>
                  {userInfo.content[key as keyof User] ||
                    t(`pages.user.profileInfo.fields.${key}.textEmpty`)}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
