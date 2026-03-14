import { useState } from 'react';
import { Plus, Apple } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const nutritionPlans = [
  { id: '1', name: 'Muscle Gain Diet', clients: 3, meals: 5, calories: 2800 },
  { id: '2', name: 'Weight Loss Plan', clients: 4, meals: 4, calories: 1800 },
];

export default function TrainerNutrition() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Nutrition Plans</h1>
          <p className="mt-1 text-muted-foreground">Create and assign meal plans</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="gradient-primary flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
          <Plus className="h-4 w-4" /> New Plan
        </button>
      </div>

      {showForm && (
        <div className="rounded-lg border bg-card p-6 card-shadow space-y-4">
          <input placeholder="Plan Name" className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2" />
          <div className="grid gap-4 sm:grid-cols-2">
            <input placeholder="Target Calories" type="number" className="rounded-lg border bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2" />
            <input placeholder="Number of Meals" type="number" className="rounded-lg border bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2" />
          </div>
          <textarea placeholder="Meal details..." rows={4} className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2" />
          <div className="flex gap-2">
            <button onClick={() => { toast({ title: 'Plan saved' }); setShowForm(false); }} className="gradient-primary rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground">Save</button>
            <button onClick={() => setShowForm(false)} className="rounded-lg border px-4 py-2 text-sm hover:bg-muted">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {nutritionPlans.map(p => (
          <div key={p.id} className="rounded-lg border bg-card p-5 card-shadow transition-all card-shadow-hover hover:-translate-y-0.5">
            <div className="mb-3 inline-flex rounded-lg bg-success/10 p-2 text-success"><Apple className="h-5 w-5" /></div>
            <h3 className="font-semibold">{p.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{p.meals} meals · {p.calories} cal · {p.clients} clients</p>
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
