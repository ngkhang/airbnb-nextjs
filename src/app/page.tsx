import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import CategoryBar from '@/components/category-bar';
import FooterDefault from '@/components/common/footer-default';
import HeaderDefault from '@/components/common/header-default';
import Inspirations from '@/components/pages/home/inspirations';
import ListExplore from '@/components/pages/home/list-explore';
import ListRoom from '@/components/pages/home/list-room';
import { Separator } from '@/components/ui/separator';
import { queryKeys } from '@/constants/queryKeys';
import getQueryClient from '@/lib/get-query-client';
import locationService from '@/services/location.service';
import roomService from '@/services/room.service';

export default async function Home() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [queryKeys.room],
    queryFn: roomService.getAll,
  });

  await queryClient.prefetchQuery({
    queryKey: [queryKeys.location],
    queryFn: locationService.getAll,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        {/* Header section */}
        <div>
          <div className='container'>
            <HeaderDefault />
          </div>

          <Separator className='hidden md:block' />
          <div className='mb-3 shadow-xl md:container'>
            <CategoryBar />
          </div>
        </div>

        {/* Properties section */}
        <section className='container mb-8 mt-6'>
          <ListRoom />
        </section>

        {/* Explore section */}
        <section className='container mb-8 mt-6'>
          <ListExplore />
        </section>

        {/*  */}
        <div className='container grid-cols-6 gap-6 bg-[#F7F7F7] 4xl:grid'>
          <div className='col-span-4 col-start-2'>
            {/* Inspiration section */}
            <Inspirations />

            <Separator className='h-[2px]' />

            {/* Footer section */}
            <FooterDefault />
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
}
