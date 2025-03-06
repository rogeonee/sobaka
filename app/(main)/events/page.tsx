import { Plus } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';

export default function EventsPage() {
  return (
    <>
      <Header
        title="Events"
        rightElement={
          <Button size="icon" variant="ghost">
            <Plus className="h-5 w-5" />
          </Button>
        }
      />
      <div className="container space-y-6 py-6">
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
          <h2 className="text-2xl font-bold">Past Events</h2>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="rounded-lg border p-4 opacity-75">
                <h3 className="font-semibold">Movie Night</h3>
                <p className="text-sm text-muted-foreground">
                  Last Friday, 7pm • Jake's Place
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((j) => (
                      <div
                        key={j}
                        className="h-6 w-6 rounded-full bg-primary/20"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    6 attended
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
