import { Users, UserCheck, Activity, TrendingUp } from 'lucide-react';
import { StatCard } from '@/components/shared/StatCard';

const recentActivity = [
  { action: 'New trainer registered', name: 'John Doe', time: '2 hours ago' },
  { action: 'Client subscription renewed', name: 'Jane Smith', time: '5 hours ago' },
  { action: 'Trainer deactivated', name: 'Bob Wilson', time: '1 day ago' },
  { action: 'New client signed up', name: 'Alice Brown', time: '1 day ago' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Platform overview and management</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Trainers" value={48} change="+12% this month" changeType="positive" icon={<Users className="h-5 w-5 text-primary" />} />
        <StatCard title="Total Clients" value={312} change="+8% this month" changeType="positive" icon={<UserCheck className="h-5 w-5 text-info" />} />
        <StatCard title="Active Users" value={287} change="+5% this week" changeType="positive" icon={<Activity className="h-5 w-5 text-success" />} />
        <StatCard title="Revenue" value="$24,500" change="+15% this month" changeType="positive" icon={<TrendingUp className="h-5 w-5 text-warning" />} />
      </div>

      <div className="rounded-lg border bg-card p-6 card-shadow">
        <h2 className="font-semibold">Recent Activity</h2>
        <div className="mt-4 divide-y">
          {recentActivity.map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium">{item.action}</p>
                <p className="text-sm text-muted-foreground">{item.name}</p>
              </div>
              <span className="text-xs text-muted-foreground">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
