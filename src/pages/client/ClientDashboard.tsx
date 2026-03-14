import { Dumbbell, Calendar, TrendingUp, Apple } from 'lucide-react';
import { StatCard } from '@/components/shared/StatCard';

const todayWorkout = [
  { exercise: 'Barbell Squat', sets: '4×8', done: true },
  { exercise: 'Romanian Deadlift', sets: '3×10', done: true },
  { exercise: 'Leg Press', sets: '3×12', done: false },
  { exercise: 'Leg Curl', sets: '3×12', done: false },
];

export default function ClientDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">My Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Welcome back, Mike</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Today's Workout" value="Leg Day" icon={<Dumbbell className="h-5 w-5 text-primary" />} />
        <StatCard title="Next Session" value="Tomorrow" icon={<Calendar className="h-5 w-5 text-info" />} />
        <StatCard title="Weight" value="82 kg" change="-1.5 kg this month" changeType="positive" icon={<TrendingUp className="h-5 w-5 text-success" />} />
        <StatCard title="Calories Today" value="1,850" icon={<Apple className="h-5 w-5 text-warning" />} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border bg-card p-6 card-shadow">
          <h2 className="font-semibold">Today's Workout — Leg Day</h2>
          <div className="mt-4 space-y-2">
            {todayWorkout.map((e, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                <input type="checkbox" defaultChecked={e.done} className="h-4 w-4 rounded border-2 accent-primary" />
                <span className={`flex-1 text-sm font-medium ${e.done ? 'line-through text-muted-foreground' : ''}`}>{e.exercise}</span>
                <span className="text-sm text-muted-foreground">{e.sets}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 card-shadow">
          <h2 className="font-semibold">Progress Summary</h2>
          <div className="mt-4 space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1"><span>Workout Completion</span><span className="font-semibold">87%</span></div>
              <div className="h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-primary" style={{ width: '87%' }} /></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1"><span>Nutrition Adherence</span><span className="font-semibold">92%</span></div>
              <div className="h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-success" style={{ width: '92%' }} /></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1"><span>Weight Goal</span><span className="font-semibold">65%</span></div>
              <div className="h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-info" style={{ width: '65%' }} /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
