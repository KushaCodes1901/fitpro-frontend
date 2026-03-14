import { Calendar, Clock } from 'lucide-react';

const sessions = [
  { date: 'Tomorrow', time: '10:00 AM', trainer: 'Sarah Johnson', type: 'Strength Training', duration: '1hr' },
  { date: 'Mar 17', time: '10:00 AM', trainer: 'Sarah Johnson', type: 'Cardio Session', duration: '45min' },
  { date: 'Mar 19', time: '2:00 PM', trainer: 'Sarah Johnson', type: 'Strength Training', duration: '1hr' },
];

export default function ClientSchedule() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Schedule</h1>
        <p className="mt-1 text-muted-foreground">Your upcoming sessions</p>
      </div>
      <div className="space-y-3">
        {sessions.map((s, i) => (
          <div key={i} className="flex items-center gap-4 rounded-lg border bg-card p-4 card-shadow">
            <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Calendar className="h-4 w-4" />
              <span className="text-[10px] font-semibold mt-0.5">{s.date}</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{s.type}</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" /> {s.time} · {s.duration} · {s.trainer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
