/* eslint-disable no-undefined */
'use client';

import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React from 'react';

import ROUTES from '@/constants/routes';
import { getPathFileAssets } from '@/helpers/fileAssets';
import { cn } from '@/lib/utils';
import { useSearchStore, type Guest } from '@/stores/searchStore';

import Icon from '../icons/icon';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Separator } from '../ui/separator';

const keyMap = {
  buttonSearch: ['stays', 'exp'],
  regionOptions: [
    'flexible',
    'europe',
    'south-korea',
    'united-states',
    'thailand',
    'australia',
  ],
  whoOptions: ['adults', 'children', 'infants', 'pets'],
} as const;

const mockApi = {
  locations: [
    {
      id: 1,
      tenViTri: 'Quận 1',
      tinhThanh: 'Hồ Chí Minh',
      quocGia: 'Việt Nam',
      hinhAnh: 'https://airbnbnew.cybersoft.edu.vn/images/vt1.jpg',
    },
    {
      id: 2,
      tenViTri: 'Cái Răng',
      tinhThanh: 'Cần Thơ',
      quocGia: 'Việt Nam',
      hinhAnh: 'https://airbnbnew.cybersoft.edu.vn/images/vt2.jpg',
    },
    {
      id: 3,
      tenViTri: 'Hòn Rùa',
      tinhThanh: 'Nha Trang',
      quocGia: 'Việt Nam',
      hinhAnh: 'https://airbnbnew.cybersoft.edu.vn/images/vt3.jpg',
    },
  ],
};

const getTotalGuestsDisplay = (guests: Guest) => {
  const total = guests.adults + guests.children;
  const parts = [];

  if (total > 0) parts.push(`${total} guest${total !== 1 ? 's' : ''}`);
  if (guests.infants > 0)
    parts.push(`${guests.infants} infant${guests.infants !== 1 ? 's' : ''}`);
  if (guests.pets > 0)
    parts.push(`${guests.pets} pet${guests.pets !== 1 ? 's' : ''}`);

  return parts.join(', ') || 'Add guests';
};

export default function SearchBar() {
  const t = useTranslations();
  const router = useRouter();
  const {
    guests,
    updateGuest,
    location,
    updateLocation,
    dateRange,
    updateDate,
  } = useSearchStore();

  const handleSearch = () => {
    const query = `location_id=${location.id}&guest=${guests.adults}&check_in=${dateRange?.from && format(dateRange.from, 'yyyy-MM-dd')}&check_out=${dateRange?.to && format(dateRange.to, 'yyyy-MM-dd')}`;
    router.push(`${ROUTES.ROOM.LOCATION}?${query}`);
  };

  return (
    <div className='flex w-full flex-col items-center'>
      {/* Title Change Search */}
      <div className='mb-4 hidden items-center md:flex'>
        {keyMap.buttonSearch.map((key) => (
          <Button
            key={key}
            className={cn(
              'flex-1 rounded-full bg-transparent px-5 py-3 text-base shadow-none hover:bg-inherit',
              key === 'stays'
                ? 'font-semibold text-[#222222]'
                : 'text-[#6A6A6A] hover:bg-[#EBEBEB] hover:text-[#222222]'
            )}
          >
            {t(`ui.buttons.search.${key}`)}
          </Button>
        ))}
      </div>

      {/* Search form */}
      <div className='flex items-center rounded-full border bg-white px-0 shadow-xl'>
        {/* Button search */}
        <div className='center ml-4 mr-2 md:order-2 md:ml-2 md:mr-4'>
          <Button
            className='button-brand-color size-8 rounded-full p-0 md:size-10 md:p-5'
            onClick={handleSearch}
          >
            <Icon name='search' />
          </Button>
        </div>

        {/* Search main */}
        <div className='grid grid-cols-3 gap-2 md:gap-4'>
          {/* Where */}
          <Popover onOpenChange={() => {}}>
            <PopoverTrigger asChild>
              <div>
                <Button
                  variant='outline'
                  className={cn(
                    'flex h-full w-full flex-col items-start rounded-full border-none px-4 py-3 text-start text-sm text-[#6A6A6A] shadow-none hover:bg-[#EBEBEB] hover:text-inherit data-[state=open]:bg-[#EBEBEB] md:px-8 md:py-4 lg:hover:bg-[#EBEBEB]'
                  )}
                >
                  <Label className='w-full overflow-hidden text-ellipsis font-semibold'>
                    {t('ui.inputs.where.label')}
                  </Label>
                  <Input
                    readOnly={true}
                    defaultValue={location.title}
                    className='h-fit text-ellipsis border-none p-0 text-sm shadow-none hover:border-none focus-visible:ring-0'
                    placeholder={t('ui.inputs.where.placeholder')}
                  />
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent
              align='start'
              className='w-[90%] p-4 text-sm text-[#6A6A6A] md:w-[500px]'
            >
              <div className='grid gap-3'>
                {/* Search by Location */}
                <div>
                  <div className='mb-3 space-y-2'>
                    <h4 className='font-semibold leading-none'>
                      {t('ui.inputs.where.label')}
                    </h4>
                    <p className='text-sm'>
                      {t('ui.inputs.where.placeholder')}
                    </p>
                  </div>
                  <Select
                    defaultValue={
                      location.id !== 0 ? `${location.id}` : undefined
                    }
                    onValueChange={(valueId) => {
                      const location = mockApi.locations.find(
                        (item) => item.id === Number(valueId)
                      );

                      const title = location
                        ? `${location.tenViTri} ${location.tinhThanh}, ${location.quocGia}`
                        : '';
                      updateLocation(valueId, title);
                    }}
                  >
                    <SelectTrigger className='w-full rounded-xl'>
                      <SelectValue
                        placeholder={t('ui.inputs.where.placeholder')}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {mockApi.locations.map((location) => (
                        <SelectItem key={location.id} value={`${location.id}`}>
                          {`${location.tenViTri} ${location.tinhThanh}, ${location.quocGia}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Search by Region */}
                <div>
                  <div className='flex items-center space-x-2'>
                    <h4 className='font-semibold leading-none'>
                      {t('ui.inputs.region.title')}
                    </h4>
                    <Badge variant='outline'>coming soon</Badge>
                  </div>
                  <div className='grid grid-flow-row grid-cols-3 grid-rows-2 gap-2'>
                    {keyMap.regionOptions.map((region) => (
                      <Card
                        key={region}
                        className='border-none p-2 shadow-none'
                      >
                        <CardHeader className='mb-2 p-0'>
                          <CardTitle className=''>
                            <Image
                              quality={100}
                              width={100}
                              height={100}
                              alt={t(`ui.inputs.region.options.${region}`)}
                              src={getPathFileAssets(
                                'mapRegion',
                                `${region}.jpg`
                              )}
                              className='inset-0 h-full w-full rounded-lg border-2 object-cover'
                            />
                          </CardTitle>
                        </CardHeader>
                        <CardContent className='p-0'>
                          <p>{t(`ui.inputs.region.options.${region}`)}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Check in/out */}
          <Popover>
            <PopoverTrigger asChild>
              <div>
                <Button
                  variant='outline'
                  className={cn(
                    'flex h-full w-full flex-col items-start rounded-full border-none px-4 py-3 text-start text-sm text-[#6A6A6A] shadow-none hover:bg-[#EBEBEB] hover:text-inherit data-[state=open]:bg-[#EBEBEB] md:px-8 md:py-4 lg:hover:bg-[#EBEBEB]'
                  )}
                >
                  <Label className='w-full overflow-hidden text-ellipsis font-semibold'>
                    {t('ui.inputs.when.label')}
                  </Label>
                  <Input
                    readOnly={true}
                    defaultValue={
                      dateRange
                        ? `${dateRange.from && format(dateRange.from, 'LLL dd')}${dateRange.to ? ' - ' + format(dateRange.to, 'LLL dd') : ''}`
                        : ''
                    }
                    className='h-fit text-ellipsis border-none p-0 text-sm shadow-none hover:border-none focus-visible:ring-0'
                    placeholder={t('ui.inputs.when.placeholder')}
                  />
                </Button>
              </div>
            </PopoverTrigger>

            <PopoverContent
              className='w-full p-4 text-sm text-[#6A6A6A] md:w-[500px]'
              align='center'
            >
              <Calendar
                initialFocus
                disabled={{ before: new Date(Date.now()) }}
                mode='range'
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={(dateRange) => updateDate(dateRange)}
                numberOfMonths={2}
                className='p-0'
              />
            </PopoverContent>
          </Popover>

          {/* Who */}
          <Popover onOpenChange={() => {}}>
            <PopoverTrigger asChild>
              <div>
                <Button
                  variant='outline'
                  className={cn(
                    'flex h-full w-full flex-col items-start rounded-full border-none px-4 py-3 text-start text-sm text-[#6A6A6A] shadow-none hover:bg-[#EBEBEB] hover:text-inherit data-[state=open]:bg-[#EBEBEB] md:px-8 md:py-4 lg:hover:bg-[#EBEBEB]'
                  )}
                >
                  <Label className='w-full overflow-hidden text-ellipsis font-semibold'>
                    {t('ui.inputs.who.label')}
                  </Label>
                  <Input
                    readOnly={true}
                    // TODO: Convert string
                    defaultValue={getTotalGuestsDisplay(guests)}
                    className='h-fit text-ellipsis border-none p-0 text-sm shadow-none hover:border-none focus-visible:ring-0'
                    placeholder={t('ui.inputs.who.placeholder')}
                  />
                </Button>
              </div>
            </PopoverTrigger>

            <PopoverContent
              align='end'
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
                          {t(`ui.inputs.who.options.${opt}.description`)}
                        </span>
                      </Label>

                      <div className='flex flex-row items-center justify-between'>
                        <Button
                          variant='outline'
                          className='size-6 rounded-full p-0'
                          type='button'
                          onClick={() => updateGuest(opt, -1)}
                          disabled={
                            (opt === 'adults' && guests['adults'] <= 1) ||
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

                        <span className='mx-4 text-center'>{guests[opt]}</span>

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
        </div>
      </div>
    </div>
  );
}
