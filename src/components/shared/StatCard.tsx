import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
}

export function StatCard({ title, value, change, changeType = 'neutral', icon }: StatCardProps) {
  return (
    <div className="rounded-lg border bg-card p-6 card-shadow transition-shadow card-shadow-hover">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="rounded-lg bg-muted p-2">{icon}</div>
      </div>
      <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
      {change && (
        <p className={cn("mt-1 text-sm", changeType === 'positive' && 'text-success', changeType === 'negative' && 'text-destructive', changeType === 'neutral' && 'text-muted-foreground')}>
          {change}
        </p>
      )}
    </div>
  );
}
