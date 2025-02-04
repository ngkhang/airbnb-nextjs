'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import Icon from '@/components/icons/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { queryKeys } from '@/constants/queryKeys';
import locationService from '@/services/location.service';
import roomService from '@/services/room.service';
import userService from '@/services/user.service';

const keyMap = {
  cardOverView: ['mapPinned', 'mapPinHouse', 'users', 'shield'],
} as const;

const NUMBERS_OF_RECENT_USER = 5;

const data = [
  {
    name: 'Jan',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Feb',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Mar',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Apr',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'May',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Jun',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Jul',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Aug',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Sep',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Oct',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Nov',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Dec',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

export default function DashboardPage() {
  const t = useTranslations();

  const [totalOverview, setTotalOverview] = useState({
    mapPinned: 0,
    mapPinHouse: 0,
    users: 0,
    shield: 0,
  });

  const { data: listRooms } = useQuery({
    queryKey: [queryKeys.room],
    queryFn: () => roomService.getAll(),
  });
  const { data: listLocations } = useQuery({
    queryKey: [queryKeys.location],
    queryFn: () => locationService.getAll(),
  });
  const { data: listUsers } = useQuery({
    queryKey: [queryKeys.user],
    queryFn: () => userService.getAll(),
  });

  useEffect(() => {
    if (listLocations && listRooms && listUsers) {
      let users = 0;
      let shield = 0;

      listUsers.content.forEach((user) =>
        user.role === 'USER' ? users++ : shield++
      );

      setTotalOverview({
        mapPinned: listLocations.content.length,
        mapPinHouse: listRooms.content.length,
        users,
        shield,
      });
    }
  }, [listLocations, listRooms, listUsers]);

  return (
    <div className='flex flex-1 flex-col gap-4 p-8 pt-0'>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {keyMap.cardOverView.map((key) => (
          <Card key={key}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                {t(`pages.admin.dashboard.cardOverview.${key}`)}
              </CardTitle>
              <Icon name={key} />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{totalOverview[key]}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <Card className='lg:col-span-4'>
          <CardHeader>
            <CardTitle>
              {t('pages.admin.dashboard.overviewChart.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className='pl-2'>
            <ResponsiveContainer width='100%' height={350}>
              <BarChart data={data}>
                <XAxis
                  dataKey='name'
                  stroke='#888888'
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke='#888888'
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Bar
                  dataKey='total'
                  fill='currentColor'
                  radius={[4, 4, 0, 0]}
                  className='fill-chart-2'
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {listUsers && (
          <Card className='lg:col-span-3'>
            <CardHeader>
              <CardTitle>
                {t('pages.admin.dashboard.listNewUser.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-8'>
                {listUsers.content
                  .slice(-NUMBERS_OF_RECENT_USER)
                  .map((user) => (
                    <div key={user.id} className='flex items-center'>
                      <Avatar className='h-9 w-9'>
                        <AvatarImage src={user.avatar || ''} alt='Avatar' />
                        <AvatarFallback>
                          <Icon name='user' size='16' />
                        </AvatarFallback>
                      </Avatar>
                      <div className='ml-4 space-y-1 overflow-hidden'>
                        <p className='text-sm font-medium leading-none'>
                          {user.name}
                        </p>
                        <p className='truncate text-sm text-muted-foreground'>
                          {user.email}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
