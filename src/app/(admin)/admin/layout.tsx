'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { AppSidebar } from '@/components/layout/admin/app-sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const t = useTranslations();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <h3>
              {t(
                `pages.admin.shared.pageTitle.${pathname.split('/').slice(-1).toString() as 'dashboard' | 'users' | 'rooms' | 'locations'}`
              )}
            </h3>
            {/* NOTE: ADD Breadcrumb */}
          </div>
        </header>

        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
