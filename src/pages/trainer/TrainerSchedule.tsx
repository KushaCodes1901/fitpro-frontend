import { Calendar, Clock } from 'lucide-react';

const sessions = [
  { id: '1', client: 'Mike Chen', date: 'Today', time: '10:00 AM', duration: '1hr', status: 'upcoming' },
  { id: '2', client: 'Amy Liu', date: 'Today', time: '2:00 PM', duration: '1hr', status: 'upcoming' },
  { id: '3', client: 'Carlos Ruiz', date: 'Tomorrow', time: '9:00 AM', duration: '45min', status: 'scheduled' },
  { id: '4', client: 'Mike Chen', date: 'Mar 16', time: '10:00 AM', duration: '1hr', status: 'scheduled' },
];

export default function TrainerSchedule() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Schedule</h1>
        <p className="mt-1 text-muted-foreground">Manage your training sessions</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-3">
          {sessions.map(s => (
            <div key={s.id} className="flex items-center gap-4 rounded-lg border bg-card p-4 card-shadow">
              <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Calendar className="h-4 w-4" />
                <span className="text-[10px] font-semibold mt-0.5">{s.date}</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">{s.client}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> {s.time} · {s.duration}</p>
              </div>
              <button className="rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-muted">Details</button>
            </div>
          ))}
        </div>

        <div className="rounded-lg border bg-card p-6 card-shadow">
          <h3 className="font-semibold">Quick Stats</h3>
          <div className="mt-4 space-y-3">
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Today</span><span className="font-semibold">2 sessions</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">This Week</span><span className="font-semibold">8 sessions</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">This Month</span><span className="font-semibold">32 sessions</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
