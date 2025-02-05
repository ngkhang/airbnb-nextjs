'use client';

import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import Icon, { type IconName } from '@/components/icons/icon';
import Spinner from '@/components/icons/spinner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { queryKeys } from '@/constants/queryKeys';
import { getPathFileAssets } from '@/helpers/fileAssets';
import { cn } from '@/lib/utils';
import commentService from '@/services/comment.service';
import roomService from '@/services/room.service';

import ReserveForm from './component/ReserveForm';

const keyMap = {
  bedRooms: ['bedroom1', 'bedroom2'],
  whatOffer: ['airVent', 'airVent', 'wifi', 'wavesLadder'],
} as const;

const formatDateComment = (dateString: string | Date): string => {
  if (
    dateString.toString().includes('T') &&
    dateString.toString().endsWith('Z')
  )
    return format(dateString, 'dd/LL/yyyy');

  if (dateString.toString().includes('/')) {
    return dateString.toString().split(' ')[0];
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString.toString();

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export default function RoomDetailPage() {
  const roomId = usePathname().replace('/rooms/', '');
  const t = useTranslations();
  const {
    data: roomDetail,
    isPending,
    isError,
  } = useQuery({
    queryKey: [queryKeys.room, roomId],
    queryFn: () => roomService.getByRoomId(roomId),
    enabled: !!roomId,
  });

  const { data: listComment } = useQuery({
    queryKey: [queryKeys.comment, roomId],
    queryFn: () => commentService.getByRoomId(roomId),
    enabled: !!roomId,
  });

  if (isPending) {
    return (
      <div className='display-center py-8'>
        <Spinner className='text-brand' size='lg' />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='display-center py-8'>
        <p>{t('feedback.error.notFound', { name: 'room' })}</p>
      </div>
    );
  }

  return (
    <div>
      {roomDetail && (
        <>
          {/* Title - Banner */}
          <div className='mb-5'>
            <div className='flex flex-col'>
              <div className='relative mb-3 md:container md:order-1'>
                <Image
                  alt={roomDetail.content.tenPhong}
                  src={roomDetail.content.hinhAnh}
                  width={600}
                  height={80}
                  quality={100}
                  className='h-full w-full'
                />

                <div className='absolute left-0 top-3 flex w-full items-center justify-between px-2 md:hidden'>
                  <Button
                    type='button'
                    variant='outline'
                    className='size-7 rounded-full border-none shadow-none'
                  >
                    <Icon
                      name='chevronLeft'
                      size='14'
                      className='font-semibold'
                    />
                  </Button>
                  <div className='grid grid-flow-col gap-2'>
                    <div
                      className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'size-7 rounded-full border-none shadow-none'
                      )}
                    >
                      <Icon
                        name='cloudUpload'
                        size='14'
                        className='font-semibold'
                      />
                    </div>
                    <div
                      className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'size-7 rounded-full border-none shadow-none'
                      )}
                    >
                      <Icon name='heart' size='14' className='font-semibold' />
                    </div>
                  </div>
                </div>
              </div>

              <div className='container flex'>
                <h2 className='mb-3 flex-1 text-2xl font-semibold md:py-5 md:text-3xl'>
                  {`★${roomDetail.content.tenPhong}★`}
                </h2>
                <div className='hidden grid-flow-col gap-2 md:grid'>
                  <div className='flex items-center gap-2 font-medium'>
                    <div
                      className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'font-medium, size-17 rounded-full border-none p-2 shadow-none'
                      )}
                    >
                      <Icon
                        name='cloudUpload'
                        size='14'
                        className='font-semibold'
                      />
                    </div>
                    <span className='underline'>Share</span>
                  </div>
                  <div className='flex items-center gap-2 font-medium'>
                    <div
                      className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'font-medium, size-17 rounded-full border-none p-2 shadow-none'
                      )}
                    >
                      <Icon name='heart' size='14' className='font-semibold' />
                    </div>
                    <span className='underline'>{t('ui.buttons.save')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main */}
          <div className='container grid-cols-5 md:grid md:gap-8 lg:grid-cols-6 xl:gap-14'>
            {/* Left section */}
            <div className='md:col-span-3 lg:col-span-4'>
              {/* Title Room */}
              <div className=''>
                <p>Entire loft in George Town, Malaysia</p>
                <p>12 guests2 bedrooms5 beds2 baths</p>
                <div className='flex items-center gap-2 text-base font-medium'>
                  {listComment && (
                    <>
                      <div className='flex items-center gap-2'>
                        <Icon name='star' size='18' className='fill-black' />
                        <span>
                          {Math.round(
                            listComment.content.reduce(
                              (total, curr) => (total += curr.saoBinhLuan),
                              0
                            ) / listComment.content.length
                          )}
                        </span>
                      </div>
                      <span> · </span>

                      <span className='font-medium underline'>
                        {listComment.content.length > 1
                          ? `${listComment.content.length} reviews`
                          : `${listComment.content.length} review`}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <Separator className='my-6 hidden md:block' />

              {/* Host */}
              <div className='hidden items-center gap-4 md:flex'>
                <Avatar className='size-14'>
                  <AvatarImage
                    src='https://github.com/shadcn.png'
                    alt='@shadcn'
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className='flex-1'>
                  <p className='font-medium'>Hosted by Comfy Homestay</p>
                  <p className='text-sm font-medium text-[#6A6A6A]'>
                    Superhost · 7 years hosting
                  </p>
                </div>
              </div>

              <Separator className='my-6' />
              {/* About this place */}
              <div className='w-full'>
                <p className='line-clamp-5 text-ellipsis whitespace-pre-line'>
                  {roomDetail.content.moTa}
                </p>
              </div>

              <Separator className='my-6' />

              {/* Where you'll sleep */}
              <div>
                <h3 className='mb-4 text-2xl font-medium lg:mb-7 lg:text-4xl'>
                  {t('pages.room.whereSleep.title')}
                </h3>

                <ScrollArea className='w-full whitespace-nowrap rounded-md'>
                  <div className='flex w-max space-x-4'>
                    {keyMap.bedRooms.map((bedRoom) => (
                      <Card
                        key={bedRoom}
                        className='min-w-60 max-w-80 border-none shadow-none'
                      >
                        <CardHeader className='mb-2 rounded-2xl p-2'>
                          <CardTitle>
                            <Image
                              src={getPathFileAssets(
                                'bedRooms',
                                t(
                                  `pages.room.whereSleep.items.${bedRoom}.fileName`
                                )
                              )}
                              alt={t(
                                `pages.room.whereSleep.items.${bedRoom}.description`
                              )}
                              quality={75}
                              height={60}
                              width={100}
                              className='size-full rounded-2xl'
                            />
                          </CardTitle>
                        </CardHeader>
                        <CardContent className='p-2'>
                          <p className='font-semibold'>
                            {t(`pages.room.whereSleep.items.${bedRoom}.title`)}
                          </p>
                          <p className='text-sm'>
                            {t(
                              `pages.room.whereSleep.items.${bedRoom}.description`
                            )}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <ScrollBar orientation='horizontal' />
                </ScrollArea>
              </div>

              <Separator className='my-6' />

              {/* What this place offers */}
              <div>
                <h3 className='mb-4 text-2xl font-medium lg:mb-7 lg:text-4xl'>
                  {t('pages.room.whatOffers.title')}
                </h3>

                <div className='grid gap-2'>
                  {keyMap.whatOffer.map((item) => (
                    <Card key={item} className='border-none shadow-none'>
                      <CardContent className='flex items-center gap-3 p-2'>
                        <Icon name={item as IconName} />
                        <p className='text-sm'>
                          {t(`pages.room.whatOffers.items.${item}`)}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Separator className='my-6 lg:hidden' />
            </div>

            {/* Right section */}
            <div className='col-span-2 hidden md:relative md:block lg:col-span-2'>
              <div className='md:sticky md:top-[250px] lg:top-[280px]'>
                <ReserveForm roomDetail={roomDetail.content} />
              </div>
            </div>
          </div>

          <div className='container'>
            <Separator className='my-6 hidden lg:block' />

            {/* Ratings */}
            <div className='mb-3 flex items-center gap-2 text-base font-medium md:text-2xl lg:text-4xl'>
              {listComment && (
                <>
                  <div className='flex items-center gap-2'>
                    <Icon name='star' size='18' className='fill-black' />
                    <span>
                      {Math.round(
                        listComment.content.reduce(
                          (total, curr) => (total += curr.saoBinhLuan),
                          0
                        ) / listComment.content.length
                      )}
                    </span>
                  </div>
                  <span> · </span>

                  <span className='font-medium underline lg:no-underline'>
                    {listComment.content.length > 1
                      ? `${listComment.content.length} reviews`
                      : `${listComment.content.length} review`}
                  </span>
                </>
              )}
            </div>

            {/* Comments */}
            <div>
              {listComment && (
                <>
                  <ScrollArea className='w-full whitespace-nowrap rounded-md md:hidden'>
                    <div className='flex w-max space-x-4'>
                      {listComment.content.map((comment) => (
                        <Card
                          key={comment.id}
                          className='min-w-60 max-w-80 text-sm font-medium'
                        >
                          <CardContent className='w-full p-3'>
                            <div className='mb-2 flex items-center gap-2'>
                              <span className='text-lg'>
                                {' '}
                                {comment.saoBinhLuan}{' '}
                              </span>
                              <Icon
                                name='star'
                                size={18}
                                className='fill-black'
                              />
                              <span> · </span>
                              <span>
                                {formatDateComment(comment.ngayBinhLuan)}
                              </span>
                            </div>
                            <p className='mb-3 line-clamp-3 whitespace-pre-line text-base font-normal'>
                              {comment.noiDung}
                            </p>
                            <div className='flex items-center gap-3'>
                              <Avatar className='size-8'>
                                <AvatarImage
                                  src={comment.avatar}
                                  alt={comment.tenNguoiBinhLuan}
                                />
                                <AvatarFallback>CN</AvatarFallback>
                              </Avatar>

                              <div>
                                <p className='font-semibold'>
                                  {comment.tenNguoiBinhLuan}
                                </p>
                                <p className='text-[#6A6A6A]'>
                                  ... month on Airbnb
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <ScrollBar orientation='horizontal' />
                  </ScrollArea>

                  <div className='hidden gap-4 md:grid lg:grid-cols-2 2xl:grid-cols-3'>
                    {listComment.content.map((comment) => (
                      <Card
                        key={comment.id}
                        className='border-none shadow-none'
                      >
                        <CardHeader className='mb-2 rounded-2xl p-2'>
                          <CardTitle className='flex items-center gap-2'>
                            <Avatar className='size-8'>
                              <AvatarImage
                                src={comment.avatar}
                                alt={comment.tenNguoiBinhLuan}
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>

                            <div>
                              <p className='font-semibold'>
                                {comment.tenNguoiBinhLuan}
                              </p>
                              <p className='text-[#6A6A6A]'>
                                ... month on Airbnb
                              </p>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className='p-2'>
                          <div className='mb-2 flex items-center gap-2'>
                            <span className='text-lg'>
                              {comment.saoBinhLuan}
                            </span>
                            <Icon
                              name='star'
                              size={18}
                              className='fill-black'
                            />
                            <span> · </span>
                            <span>
                              {formatDateComment(comment.ngayBinhLuan)}
                            </span>
                          </div>
                          <p className='mb-3 line-clamp-3 whitespace-pre-line text-base font-normal'>
                            {comment.noiDung}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </div>

            <Separator className='my-6' />

            {/* Where you’ll be */}
            <div>
              <h3 className='mb-4 text-2xl font-medium lg:mb-7 lg:text-4xl'>
                {t('pages.room.where.title')}
              </h3>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15676.573304912468!2d106.7122688!3d10.8003328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1734592326619!5m2!1sen!2s'
                width='80'
                height='100'
                className='size-full h-[180px] border-none md:h-[400px]'
                allowFullScreen={false}
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
              ></iframe>
            </div>

            {/* Meet your Host */}
            <div className='mb-10 md:hidden'>
              <Separator className='my-6' />

              <h3 className='mb-4 text-2xl font-medium lg:mb-7 lg:text-4xl'>
                {t('pages.room.meetHost.title')}
              </h3>

              <div className='flex items-center gap-4'>
                <Avatar className='size-14'>
                  <AvatarImage
                    src='https://github.com/shadcn.png'
                    alt='@shadcn'
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className='flex-1'>
                  <p className='font-medium'>Hosted by Comfy Homestay</p>
                  <p className='text-sm font-medium text-[#6A6A6A]'>
                    Superhost · 7 years hosting
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
