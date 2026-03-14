import { Users, Calendar, Activity, Dumbbell } from 'lucide-react';
import { StatCard } from '@/components/shared/StatCard';

const recentClients = [
  { name: 'Mike Chen', action: 'Completed chest day workout', time: '1 hour ago' },
  { name: 'Amy Liu', action: 'Logged nutrition for today', time: '3 hours ago' },
  { name: 'Carlos Ruiz', action: 'Missed scheduled session', time: '5 hours ago' },
];

export default function TrainerDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Trainer Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Welcome back, Sarah</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Active Clients" value={12} icon={<Users className="h-5 w-5 text-primary" />} />
        <StatCard title="Today's Sessions" value={3} icon={<Calendar className="h-5 w-5 text-info" />} />
        <StatCard title="Active Plans" value={8} icon={<Dumbbell className="h-5 w-5 text-success" />} />
        <StatCard title="Completion Rate" value="87%" change="+3% this week" changeType="positive" icon={<Activity className="h-5 w-5 text-warning" />} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border bg-card p-6 card-shadow">
          <h2 className="font-semibold">Recent Client Activity</h2>
          <div className="mt-4 divide-y">
            {recentClients.map((c, i) => (
              <div key={i} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="text-sm text-muted-foreground">{c.action}</p>
                </div>
                <span className="text-xs text-muted-foreground">{c.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 card-shadow">
          <h2 className="font-semibold">Upcoming Sessions</h2>
          <div className="mt-4 space-y-3">
            {['Mike Chen - 10:00 AM', 'Amy Liu - 2:00 PM', 'Carlos Ruiz - 5:00 PM'].map((s, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg bg-muted p-3 text-sm">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="font-medium">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
