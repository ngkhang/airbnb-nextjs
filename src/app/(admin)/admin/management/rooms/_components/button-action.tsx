import { useTranslations } from 'next-intl';

import DrawerDialog from '@/components/drawer-dialog';
import { Button } from '@/components/ui/button';
import { useDeleteRoom } from '@/hooks/use-room';

import ViewRoomDetail from './view-room-profile';

export default function ButtonAction({ roomId }: { roomId: string | number }) {
  const { mutateAsync: deleteRoom } = useDeleteRoom();

  const t = useTranslations();
  return (
    <div className='grid gap-2'>
      <DrawerDialog
        title={t('ui.buttons.view')}
        button={{
          title: t('ui.buttons.view'),
          className: 'w-full bg-[#f7f7f7]',
        }}
        width='lg:max-w-[650px]'
      >
        <ViewRoomDetail roomId={roomId} />
      </DrawerDialog>
      <Button
        type='button'
        variant='destructive'
        className='max-w- bg-brand/80 text-white'
        onClick={() => deleteRoom(roomId)}
      >
        {t('ui.buttons.delete')}
      </Button>
    </div>
  );
}
