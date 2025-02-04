import { useTranslations } from 'next-intl';

import DrawerDialog from '@/components/drawer-dialog';
import { Button } from '@/components/ui/button';
import useDeleteUser from '@/hooks/user/use-delete-user';

import ViewUserForm from './view-user-profile';

export default function ButtonAction({ userId }: { userId: string | number }) {
  const { mutateAsync: deleteUser } = useDeleteUser();

  const t = useTranslations();
  return (
    <div className='grid gap-2'>
      <DrawerDialog
        title={t('ui.buttons.view')}
        button={{
          title: t('ui.buttons.view'),
          className: ' w-full bg-[#f7f7f7]',
        }}
      >
        <ViewUserForm userId={userId} />
      </DrawerDialog>
      <Button
        type='button'
        variant='destructive'
        className='bg-brand/80 text-white'
        onClick={() => deleteUser(userId)}
      >
        {t('ui.buttons.delete')}
      </Button>
    </div>
  );
}
