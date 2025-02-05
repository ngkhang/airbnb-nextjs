'use client';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import Spinner from '@/components/icons/spinner';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { queryKeys } from '@/constants/queryKeys';
import { useCreateRoom } from '@/hooks/use-room';
import useZodForm from '@/hooks/use-zod-form';
import { handleErrorApi } from '@/lib/utils';
import { RoomFormSchema, type RoomForm } from '@/schemas/room.schema';
import locationService from '@/services/location.service';
import type { Room } from '@/types/room.type';

const items = [
  'mayGiat',
  'banLa',
  'tivi',
  'dieuHoa',
  'wifi',
  'bep',
  'doXe',
  'hoBoi',
  'banUi',
] as const;

type Equipment = {
  // eslint-disable-next-line no-unused-vars
  [key in (typeof items)[number]]: boolean;
};

export default function CreateRoomForm() {
  const t = useTranslations();
  const { mutateAsync: createRoom, isPending } = useCreateRoom();
  const { data: listLocation } = useQuery({
    queryKey: [queryKeys.location],
    queryFn: () => locationService.getAll(),
  });

  const form = useZodForm(RoomFormSchema, {
    defaultValues: {
      equipments: [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: RoomForm) {
    try {
      const { equipments, ...data } = values;
      const roomEquipments: Equipment = {
        mayGiat: false,
        banLa: false,
        tivi: false,
        dieuHoa: false,
        wifi: false,
        bep: false,
        doXe: false,
        hoBoi: false,
        banUi: false,
      };

      items.forEach((item) => {
        roomEquipments[item] = equipments.includes(item);
      });

      const newRoom: Room = {
        id: 0,
        ...roomEquipments,
        tenPhong: data.tenPhong,
        moTa: data.moTa || '',
        hinhAnh: data.hinhAnh || '',
        khach: Number(data.khach),
        phongNgu: Number(data.phongNgu),
        giuong: Number(data.giuong),
        phongTam: Number(data.phongTam),
        maViTri: Number(data.maViTri),
        giaTien: Number(data.giaTien),
      };
      await createRoom(newRoom);
    } catch (error) {
      handleErrorApi(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='grid grid-cols-4 gap-6'
      >
        <FormField
          control={form.control}
          name='tenPhong'
          render={({ field }) => (
            <FormItem className='col-span-full grid gap-2'>
              <FormLabel>
                {t(`pages.room.details.tenPhong`)}
                <span className='ml-1 text-sm text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input type='text' placeholder='' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='moTa'
          render={({ field }) => (
            <FormItem className='col-span-full grid gap-2'>
              <FormLabel>
                {t(`pages.room.details.moTa`)}
                <span className='ml-1 text-sm text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Textarea className='resize-none' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='giaTien'
          render={({ field }) => (
            <FormItem className='col-span-1 grid gap-2'>
              <FormLabel>
                {t(`pages.room.details.giaTien`)}
                <span className='ml-1 text-sm text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input type='text' placeholder='' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='giuong'
          render={({ field }) => (
            <FormItem className='col-span-1 grid gap-2'>
              <FormLabel>
                {t(`pages.room.details.giuong`)}
                <span className='ml-1 text-sm text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input type='text' placeholder='' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='khach'
          render={({ field }) => (
            <FormItem className='col-span-1 grid gap-2'>
              <FormLabel>
                {t(`pages.room.details.khach`)}
                <span className='ml-1 text-sm text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input type='text' placeholder='' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='phongNgu'
          render={({ field }) => (
            <FormItem className='col-span-1 grid gap-2'>
              <FormLabel>
                {t(`pages.room.details.phongNgu`)}
                <span className='ml-1 text-sm text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input type='text' placeholder='' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='phongTam'
          render={({ field }) => (
            <FormItem className='col-span-1 grid gap-2'>
              <FormLabel>
                {t(`pages.room.details.phongTam`)}
                <span className='ml-1 text-sm text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input type='text' placeholder='' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='hinhAnh'
          render={({ field }) => (
            <FormItem className='col-span-2 grid gap-2'>
              <FormLabel>{t(`pages.room.details.hinhAnh`)}</FormLabel>
              <FormControl>
                <Input type='file' placeholder='' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='maViTri'
          render={({ field }) => (
            <FormItem className='col-span-2 grid gap-2'>
              <FormLabel>
                {t(`pages.room.details.maViTri`)}
                <span className='ml-1 text-sm text-red-500'>*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} value={`${field.value}`}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Choose Location'>
                      {
                        listLocation?.content.find(
                          (opt) => opt.id === Number(field.value)
                        )?.tenViTri
                      }
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {listLocation?.content.map((item) => (
                    <SelectItem key={item.id} value={`${item.id}`}>
                      {item.tenViTri}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='equipments'
          render={() => (
            <FormItem className='col-span-full grid gap-2'>
              <div className='mb-4'>
                <FormLabel className='text-base'>Equipments</FormLabel>
              </div>
              <div className='flex flex-wrap gap-2'>
                {items.map((item) => (
                  <FormField
                    key={item}
                    control={form.control}
                    name='equipments'
                    render={({ field }) => (
                      <FormItem key={item} className='space-x-3 space-y-0'>
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item)}
                            onCheckedChange={(checked) =>
                              checked
                                ? field.onChange([...field.value, item])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item
                                    )
                                  )
                            }
                          />
                        </FormControl>
                        <FormLabel className='text-sm font-normal'>
                          {t(`common.equipments.${item}`)}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          disabled={isPending}
          className='hover:bg-linear col-span-full w-full bg-[#FF385C] transition-colors'
        >
          {isPending ? (
            <>
              <Spinner />
              {t('ui.buttons.submitting')}
            </>
          ) : (
            <>{t('ui.buttons.add', { name: 'room' })}</>
          )}
        </Button>
      </form>
    </Form>
  );
}
