import { Edit } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <Header
        title="Profile"
        rightElement={
          <Button size="icon" variant="ghost">
            <Edit className="h-5 w-5" />
          </Button>
        }
      />
      <div className="container space-y-6 py-6">
        <section className="flex flex-col items-center space-y-3">
          <div className="h-24 w-24 rounded-full bg-primary/20" />
          <h2 className="text-2xl font-bold">
            {user?.email?.split('@')[0] || 'User'}
          </h2>
          <p className="text-muted-foreground">
            Member since{' '}
            {new Date(user?.created_at || Date.now()).toLocaleDateString()}
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-semibold">Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border p-4 text-center">
              <p className="text-3xl font-bold">24</p>
              <p className="text-sm text-muted-foreground">Events Attended</p>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <p className="text-3xl font-bold">85%</p>
              <p className="text-sm text-muted-foreground">Attendance Rate</p>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <p className="text-3xl font-bold">8</p>
              <p className="text-sm text-muted-foreground">Events Organized</p>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <p className="text-3xl font-bold">92</p>
              <p className="text-sm text-muted-foreground">Total Points</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-semibold">Recent Activity</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg border p-3"
              >
                <div className="h-10 w-10 rounded-full bg-primary/20" />
                <div>
                  <p className="font-medium">Attended Beach Volleyball</p>
                  <p className="text-sm text-muted-foreground">2 days ago</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
