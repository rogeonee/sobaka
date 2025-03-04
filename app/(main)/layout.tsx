import type React from 'react';
import { BottomTabs } from '@/components/layout/bottom-tabs';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if user is authenticated
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/sign-in');
  }

  const { data, error } = await supabase
    .from('user_tokens')
    .select('*')
    .single();
  console.log(data, error);

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 pb-16">{children}</div>
      <BottomTabs />
    </main>
  );
}
