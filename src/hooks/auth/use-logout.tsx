'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import ROUTES from '@/constants/routes';
import getQueryClient from '@/lib/get-query-client';
import authService from '@/services/auth.service';
import { useUserStore } from '@/stores/userStore';

const queryClient = getQueryClient();

export default function useLogout() {
  const router = useRouter();
  const { deleteUser } = useUserStore();

  return useMutation({
    mutationKey: ['auth', 'logout'],
    mutationFn: async () => {
      await authService.logoutNextServer();
      deleteUser();
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });

      router.push(ROUTES.HOME);
      router.refresh();
    },
  });
}
