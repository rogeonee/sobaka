import { Bell } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <>
      <Header
        title="Home"
        rightElement={
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
        }
      />
      <div className="container space-y-6 py-6">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Your Group</h2>
          <div className="rounded-lg border p-4">
            <h3 className="text-xl font-semibold">Weekend Warriors</h3>
            <p className="text-muted-foreground">8 members</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Upcoming Events</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border p-4">
                <h3 className="font-semibold">Beach Volleyball</h3>
                <p className="text-sm text-muted-foreground">
                  Saturday, 2pm • Santa Monica Beach
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((j) => (
                      <div
                        key={j}
                        className="h-6 w-6 rounded-full bg-primary/20"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    +2 going
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Leaderboard</h2>
          <div className="rounded-lg border">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b p-4 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span className="font-medium">{i}.</span>
                  <div className="h-8 w-8 rounded-full bg-primary/20" />
                  <span className="font-medium">User {i}</span>
                </div>
                <span className="font-semibold">{100 - i * 15} pts</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
