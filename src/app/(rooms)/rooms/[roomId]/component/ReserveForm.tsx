'use client';

import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import Icon from '@/components/icons/icon';
import Spinner from '@/components/icons/spinner';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import ROUTES from '@/constants/routes';
import { useCreateBooking } from '@/hooks/use-booking';
import useNotification from '@/hooks/use-notification';
import useZodForm from '@/hooks/use-zod-form';
import { cn, formatCurrency } from '@/lib/utils';
import {
  PreReserveSchema,
  type PreReserveType,
} from '@/schemas/booking.schema';
import { useSearchStore } from '@/stores/searchStore';
import { useUserStore } from '@/stores/userStore';
import type { Room } from '@/types/room.type';

interface ReserveFormProps {
  roomDetail: Room;
}
const keyMap = {
  whoOptions: ['adults', 'children', 'infants', 'pets'],
} as const;

const getTotalDate = (startDate?: Date, endDate?: Date): number => {
  if (!startDate || !endDate) return 0;

  return Math.round(
    (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
  );
};

export default function ReserveForm({ roomDetail }: ReserveFormProps) {
  const t = useTranslations();
  const { guests, dateRange, updateGuest } = useSearchStore();
  const { show } = useNotification();
  const { user } = useUserStore();
  const router = useRouter();
  const { mutateAsync: createBooking, isPending } = useCreateBooking();

  const reserveForm = useZodForm(PreReserveSchema, {
    defaultValues: {
      maPhong: roomDetail.id,
      soLuongKhach: guests.adults + guests.children,
      ngayDen: dateRange?.from,
      ngayDi: dateRange?.to,
    },
  });

  async function onSubmitBooking(data: PreReserveType) {
    if (!user)
      show(t('feedback.error.notLogin'), {
        type: 'error',
        onClose: () => router.push(ROUTES.AUTH.LOGIN),
      });
    else if (roomDetail.khach < data.soLuongKhach)
      show(t('feedback.error.maximumGuest', { number: roomDetail.khach }), {
        type: 'error',
      });
    else
      await createBooking({
        ...data,
        maNguoiDung: user.id,
      });
  }

  return (
    <Card className=''>
      {/* Card Header */}
      <CardHeader>
        <CardTitle className='flex items-center'>
          <Icon name='vnd' className='size-5' />
          <span>
            {`${formatCurrency(roomDetail.giaTien)} ${t('ui.label.night')}`}
          </span>
        </CardTitle>
      </CardHeader>

      {/* Card Content */}
      <CardContent>
        <Form {...reserveForm}>
          <form
            onSubmit={reserveForm.handleSubmit(onSubmitBooking)}
            className='grid grid-cols-2'
          >
            <div className='col-span-1 rounded-tl-2xl border border-black border-b-transparent p-3'>
              <FormField
                control={reserveForm.control}
                name='ngayDen'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <div className='flex cursor-pointer flex-col'>
                            <span className='mb-1 font-medium uppercase'>
                              {t('ui.label.checkIn')}
                            </span>
                            <span
                              className={cn(
                                'font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value
                                ? format(field.value, 'LLL dd')
                                : t('ui.label.pickDate')}
                            </span>
                          </div>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          initialFocus
                          disabled={(date) => date < new Date()}
                          mode='single'
                          defaultMonth={dateRange?.from}
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-1 rounded-tr-2xl border border-black border-b-transparent border-l-transparent p-3'>
              <FormField
                control={reserveForm.control}
                name='ngayDi'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <div className='flex cursor-pointer flex-col'>
                            <span className='mb-1 font-medium uppercase'>
                              {t('ui.label.checkOut')}
                            </span>
                            <span
                              className={cn(
                                'font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value
                                ? format(field.value, 'LLL dd')
                                : t('ui.label.pickDate')}
                            </span>
                          </div>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='end'>
                        <Calendar
                          initialFocus
                          disabled={(date) =>
                            date < new Date() ||
                            date <= reserveForm.watch('ngayDen')
                          }
                          mode='single'
                          selected={field.value}
                          defaultMonth={dateRange?.from}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='col-span-2 rounded-b-2xl border border-black p-3'>
              <FormField
                control={reserveForm.control}
                name='soLuongKhach'
                render={({ field }) => (
                  <FormItem className=''>
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className='flex cursor-pointer items-center justify-between'>
                          <div className='flex flex-col'>
                            <span className='mb-1 font-medium uppercase'>
                              {t('ui.label.guest')}
                            </span>
                            <span
                              className={cn(
                                'font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value || t('ui.inputs.who.label')}
                            </span>
                          </div>
                          <Icon name='chevronDown' />
                        </div>
                      </PopoverTrigger>

                      <PopoverContent
                        align='end'
                        onCloseAutoFocus={() =>
                          reserveForm.setValue(
                            'soLuongKhach',
                            guests.adults + guests.children
                          )
                        }
                        className='w-full p-4 text-sm text-[#6A6A6A] md:w-[300px]'
                      >
                        <div className='grid gap-2'>
                          {keyMap.whoOptions.map((opt, index) => (
                            <div key={opt}>
                              {index !== 0 && <Separator className='h-[1px]' />}
                              <div className='flex items-center justify-between gap-3 py-3'>
                                <Label
                                  htmlFor={opt}
                                  className='flex flex-1 flex-col text-sm'
                                >
                                  <span className='mb-2 text-[#222222]'>
                                    {t(`ui.inputs.who.options.${opt}.title`)}
                                  </span>
                                  <span className='font-normal'>
                                    {t(
                                      `ui.inputs.who.options.${opt}.description`
                                    )}
                                  </span>
                                </Label>

                                <div className='flex flex-row items-center justify-between'>
                                  <Button
                                    variant='outline'
                                    className='size-6 rounded-full p-0'
                                    type='button'
                                    onClick={() => updateGuest(opt, -1)}
                                    disabled={
                                      (opt === 'adults' &&
                                        guests['adults'] <= 1) ||
                                      guests[opt] <= 0
                                    }
                                  >
                                    <Icon size='18' name='minus' />
                                  </Button>

                                  <Input
                                    id={opt}
                                    defaultValue={guests[opt]}
                                    className='hidden'
                                  />

                                  <span className='mx-4 text-center'>
                                    {guests[opt]}
                                  </span>

                                  <Button
                                    variant='outline'
                                    className='size-6 rounded-full p-0'
                                    type='button'
                                    onClick={() => updateGuest(opt, 1)}
                                  >
                                    <Icon size='18' name='plus' />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={reserveForm.control}
              name='maPhong'
              render={({ field }) => (
                <FormItem className='hidden'>
                  <FormLabel>RoomId</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type='submit'
              className='col-span-full mt-7 py-6 text-base lg:text-xl'
            >
              {isPending ? (
                <>
                  <Spinner />
                  {t('ui.buttons.submitting')}
                </>
              ) : (
                <>{t('ui.buttons.reverse')}</>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      {/* Card Footer */}

      <CardFooter className='flex-col items-stretch'>
        <div className='flex items-center justify-between'>
          <p className='flex items-center'>
            <Icon name='vnd' className='size-3' />

            <span>{`${formatCurrency(roomDetail.giaTien)} x ${getTotalDate(reserveForm.watch('ngayDen'), reserveForm.watch('ngayDi'))} ${t('ui.label.night')}`}</span>
          </p>
          <p className='flex items-center'>
            <Icon name='vnd' className='size-3' />
            <span>{`${formatCurrency(roomDetail.giaTien * getTotalDate(reserveForm.watch('ngayDen'), reserveForm.watch('ngayDi')))}`}</span>
          </p>
        </div>
        <Separator className='my-4' />
        <div className='flex items-center justify-between font-medium'>
          <p>{t('ui.label.totalTaxes')}</p>
          <p className='flex items-center'>
            <Icon name='vnd' className='size-5' />
            <span>{`${formatCurrency(roomDetail.giaTien * getTotalDate(reserveForm.watch('ngayDen'), reserveForm.watch('ngayDi')))}`}</span>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
