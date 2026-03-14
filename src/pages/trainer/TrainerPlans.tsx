import { useState } from 'react';
import { Plus, Dumbbell, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ExerciseItem { name: string; sets: number; reps: string; rest: string; }
interface DayPlan { day: string; exercises: ExerciseItem[]; }

export default function TrainerPlans() {
  const [plans] = useState([
    { id: '1', name: 'Strength Builder', clients: 4, days: 5 },
    { id: '2', name: 'Fat Loss Program', clients: 3, days: 4 },
    { id: '3', name: 'Endurance Plan', clients: 2, days: 6 },
  ]);
  const [showBuilder, setShowBuilder] = useState(false);
  const [planName, setPlanName] = useState('');
  const [days, setDays] = useState<DayPlan[]>([{ day: 'Day 1', exercises: [{ name: '', sets: 3, reps: '10', rest: '60s' }] }]);

  const addDay = () => setDays(d => [...d, { day: `Day ${d.length + 1}`, exercises: [{ name: '', sets: 3, reps: '10', rest: '60s' }] }]);
  const addExercise = (dayIdx: number) => {
    const updated = [...days];
    updated[dayIdx].exercises.push({ name: '', sets: 3, reps: '10', rest: '60s' });
    setDays(updated);
  };
  const removeExercise = (dayIdx: number, exIdx: number) => {
    const updated = [...days];
    updated[dayIdx].exercises.splice(exIdx, 1);
    setDays(updated);
  };
  const updateExercise = (dayIdx: number, exIdx: number, field: keyof ExerciseItem, value: string | number) => {
    const updated = [...days];
    (updated[dayIdx].exercises[exIdx] as any)[field] = value;
    setDays(updated);
  };

  const handleSave = () => {
    if (!planName.trim()) return;
    toast({ title: 'Plan created', description: `${planName} saved successfully` });
    setShowBuilder(false); setPlanName(''); setDays([{ day: 'Day 1', exercises: [{ name: '', sets: 3, reps: '10', rest: '60s' }] }]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Workout Plans</h1>
          <p className="mt-1 text-muted-foreground">Create and manage workout programs</p>
        </div>
        <button onClick={() => setShowBuilder(!showBuilder)} className="gradient-primary flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
          <Plus className="h-4 w-4" /> New Plan
        </button>
      </div>

      {showBuilder && (
        <div className="space-y-4 rounded-lg border bg-card p-6 card-shadow">
          <input placeholder="Plan Name" value={planName} onChange={e => setPlanName(e.target.value)}
            className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm font-semibold outline-none ring-ring focus:ring-2" />

          {days.map((day, di) => (
            <div key={di} className="rounded-lg border p-4 space-y-3">
              <h3 className="font-semibold">{day.day}</h3>
              {day.exercises.map((ex, ei) => (
                <div key={ei} className="flex flex-wrap gap-2 items-center">
                  <input placeholder="Exercise" value={ex.name} onChange={e => updateExercise(di, ei, 'name', e.target.value)}
                    className="min-w-[140px] flex-1 rounded-lg border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2" />
                  <input placeholder="Sets" type="number" value={ex.sets} onChange={e => updateExercise(di, ei, 'sets', +e.target.value)}
                    className="w-16 rounded-lg border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2" />
                  <input placeholder="Reps" value={ex.reps} onChange={e => updateExercise(di, ei, 'reps', e.target.value)}
                    className="w-20 rounded-lg border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2" />
                  <input placeholder="Rest" value={ex.rest} onChange={e => updateExercise(di, ei, 'rest', e.target.value)}
                    className="w-20 rounded-lg border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2" />
                  <button onClick={() => removeExercise(di, ei)} className="p-1.5 text-destructive hover:bg-destructive/10 rounded"><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
              <button onClick={() => addExercise(di)} className="text-sm text-primary hover:underline">+ Add Exercise</button>
            </div>
          ))}

          <div className="flex gap-2">
            <button onClick={addDay} className="rounded-lg border px-4 py-2 text-sm hover:bg-muted">+ Add Day</button>
            <button onClick={handleSave} className="gradient-primary rounded-lg px-6 py-2 text-sm font-semibold text-primary-foreground">Save Plan</button>
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map(p => (
          <div key={p.id} className="rounded-lg border bg-card p-5 card-shadow transition-all card-shadow-hover hover:-translate-y-0.5">
            <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-2 text-primary"><Dumbbell className="h-5 w-5" /></div>
            <h3 className="font-semibold">{p.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{p.days} days · {p.clients} clients</p>
            <div className="mt-4 flex gap-2">
              <button className="text-sm text-primary hover:underline">Edit</button>
              <button className="text-sm text-primary hover:underline">Assign</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
