import type React from 'react';
import { BottomTabs } from '@/components/layout/bottom-tabs';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 pb-16">{children}</div>
      <BottomTabs />
    </main>
  );
}
