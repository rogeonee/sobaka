import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect('/home');
  }

  const { data, error } = await supabase
    .from('user_tokens')
    .select('*')
    .single();
  console.log(data, error);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-8 max-w-md text-center">
        <h1 className="text-4xl font-bold">Welcome to Sobaka</h1>
        <p className="text-lg text-muted-foreground">
          The ultimate friend group event planning app that helps you organize
          gatherings with ease.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
