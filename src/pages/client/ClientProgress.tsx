import { TrendingDown, Ruler } from 'lucide-react';

const weightData = [
  { date: 'Jan', weight: 86 },
  { date: 'Feb', weight: 84.5 },
  { date: 'Mar', weight: 83.2 },
  { date: 'Apr', weight: 82 },
];

const measurements = [
  { label: 'Chest', current: '102 cm', change: '+2 cm' },
  { label: 'Waist', current: '82 cm', change: '-3 cm' },
  { label: 'Arms', current: '38 cm', change: '+1.5 cm' },
  { label: 'Thighs', current: '60 cm', change: '+1 cm' },
];

export default function ClientProgress() {
  const maxW = Math.max(...weightData.map(d => d.weight));
  const minW = Math.min(...weightData.map(d => d.weight));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Progress</h1>
        <p className="mt-1 text-muted-foreground">Track your fitness journey</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border bg-card p-6 card-shadow">
          <h3 className="flex items-center gap-2 font-semibold"><TrendingDown className="h-4 w-4 text-primary" /> Weight Tracking</h3>
          <div className="mt-6 flex items-end justify-between gap-2 h-40">
            {weightData.map((d, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-xs font-semibold">{d.weight}</span>
                <div className="w-full rounded-t-md bg-primary/80 transition-all" style={{ height: `${((d.weight - minW + 1) / (maxW - minW + 2)) * 100}%` }} />
                <span className="text-xs text-muted-foreground">{d.date}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 card-shadow">
          <h3 className="flex items-center gap-2 font-semibold"><Ruler className="h-4 w-4 text-info" /> Body Measurements</h3>
          <div className="mt-4 space-y-3">
            {measurements.map((m, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                <span className="text-sm font-medium">{m.label}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold">{m.current}</span>
                  <span className={`text-xs font-medium ${m.change.startsWith('+') ? 'text-success' : 'text-primary'}`}>{m.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
