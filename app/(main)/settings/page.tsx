import { ChevronRight } from 'lucide-react';
import { signOutAction } from '@/app/actions';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function SettingsPage() {
  return (
    <>
      <Header title="Settings" />
      <div className="container space-y-6 py-6">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <div className="space-y-2 rounded-lg border p-4">
            <div className="flex items-center justify-between py-2">
              <div className="space-y-0.5">
                <Label htmlFor="event-reminders">Event Reminders</Label>
                <p className="text-xs text-muted-foreground">
                  Get notified about upcoming events
                </p>
              </div>
              <Checkbox id="event-reminders" defaultChecked />
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="space-y-0.5">
                <Label htmlFor="new-events">New Events</Label>
                <p className="text-xs text-muted-foreground">
                  Get notified when new events are created
                </p>
              </div>
              <Checkbox id="new-events" defaultChecked />
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="space-y-0.5">
                <Label htmlFor="group-updates">Group Updates</Label>
                <p className="text-xs text-muted-foreground">
                  Get notified about group changes
                </p>
              </div>
              <Checkbox id="group-updates" defaultChecked />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Linked Accounts</h2>
          <div className="rounded-lg border">
            <div className="flex items-center justify-between border-b p-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/20" />
                <span>Google</span>
              </div>
              <Button variant="ghost" size="sm">
                <span>Connected</span>
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/20" />
                <span>Apple</span>
              </div>
              <Button variant="ghost" size="sm">
                <span>Connect</span>
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">App Preferences</h2>
          <div className="space-y-2 rounded-lg border p-4">
            <div className="flex items-center justify-between py-2">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-xs text-muted-foreground">Use dark theme</p>
              </div>
              <Checkbox id="dark-mode" />
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="space-y-0.5">
                <Label htmlFor="save-data">Data Saver</Label>
                <p className="text-xs text-muted-foreground">
                  Reduce data usage
                </p>
              </div>
              <Checkbox id="save-data" />
            </div>
          </div>
        </section>

        <div className="pt-4">
          <form action={signOutAction}>
            <Button type="submit" variant="destructive" className="w-full">
              Sign Out
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
