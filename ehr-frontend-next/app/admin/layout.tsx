'use client';

import { SidebarProvider } from '@/components/sidebar/sidebar-context';
import { Sidebar } from './admin-siderbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}