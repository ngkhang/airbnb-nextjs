'use client';

import NavFooterAdmin from '@/components/layout/admin/nav-footer-admin';
import NavMainAdmin from '@/components/layout/admin/nav-main-admin';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useUserStore } from '@/stores/userStore';

import NavHeaderAdmin from './nav-header-admin';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUserStore();

  return (
    <Sidebar collapsible='icon' {...props}>
      {/* Sidebar Header */}
      <SidebarHeader>
        <NavHeaderAdmin />
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent>
        <NavMainAdmin />
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter>{user && <NavFooterAdmin account={user} />}</SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
