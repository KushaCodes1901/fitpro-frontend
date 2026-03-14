import { useState } from 'react';
import { CheckCircle2, Circle, Dumbbell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const workoutDays = [
  { day: 'Monday — Chest & Triceps', exercises: [
    { name: 'Bench Press', sets: '4×8', completed: true },
    { name: 'Incline Dumbbell Press', sets: '3×10', completed: true },
    { name: 'Cable Fly', sets: '3×12', completed: false },
    { name: 'Tricep Pushdown', sets: '3×12', completed: false },
  ]},
  { day: 'Tuesday — Back & Biceps', exercises: [
    { name: 'Deadlift', sets: '4×6', completed: false },
    { name: 'Pull-ups', sets: '3×10', completed: false },
    { name: 'Barbell Row', sets: '3×10', completed: false },
    { name: 'Barbell Curl', sets: '3×12', completed: false },
  ]},
  { day: 'Wednesday — Legs', exercises: [
    { name: 'Squat', sets: '4×8', completed: false },
    { name: 'Leg Press', sets: '3×12', completed: false },
    { name: 'Romanian Deadlift', sets: '3×10', completed: false },
    { name: 'Calf Raise', sets: '4×15', completed: false },
  ]},
];

export default function ClientWorkouts() {
  const [days, setDays] = useState(workoutDays);

  const toggleExercise = (dayIdx: number, exIdx: number) => {
    const updated = [...days];
    updated[dayIdx].exercises[exIdx].completed = !updated[dayIdx].exercises[exIdx].completed;
    setDays(updated);
    if (updated[dayIdx].exercises[exIdx].completed) {
      toast({ title: 'Exercise completed! 💪' });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Workouts</h1>
        <p className="mt-1 text-muted-foreground">Your assigned workout plan</p>
      </div>

      <div className="space-y-4">
        {days.map((day, di) => (
          <div key={di} className="rounded-lg border bg-card p-5 card-shadow">
            <h3 className="flex items-center gap-2 font-semibold">
              <Dumbbell className="h-4 w-4 text-primary" /> {day.day}
            </h3>
            <div className="mt-3 space-y-2">
              {day.exercises.map((ex, ei) => (
                <button key={ei} onClick={() => toggleExercise(di, ei)}
                  className="flex w-full items-center gap-3 rounded-lg bg-muted/50 p-3 text-left transition-colors hover:bg-muted">
                  {ex.completed ? <CheckCircle2 className="h-5 w-5 text-success" /> : <Circle className="h-5 w-5 text-muted-foreground" />}
                  <span className={cn("flex-1 text-sm font-medium", ex.completed && "line-through text-muted-foreground")}>{ex.name}</span>
                  <span className="text-sm text-muted-foreground">{ex.sets}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
