import { useTranslations } from 'next-intl';

import DrawerDialog from '@/components/drawer-dialog';
import { Button } from '@/components/ui/button';
import { useDeleteLocation } from '@/hooks/use-location';

import ViewLocationDetail from './view-location';

export default function ButtonAction({
  locationId,
}: {
  locationId: string | number;
}) {
  const { mutateAsync: deleteLocation } = useDeleteLocation();

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
        <ViewLocationDetail locationId={locationId} />
      </DrawerDialog>
      <Button
        type='button'
        variant='destructive'
        className='bg-brand/80 text-white'
        onClick={() => deleteLocation(locationId)}
      >
        {t('ui.buttons.delete')}
      </Button>
    </div>
  );
}
