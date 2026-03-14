import { Apple } from 'lucide-react';

const meals = [
  { time: '7:00 AM', name: 'Breakfast', foods: ['Oatmeal with berries', 'Protein shake', '2 eggs'], calories: 580, protein: 42, carbs: 65, fat: 18 },
  { time: '10:00 AM', name: 'Snack', foods: ['Greek yogurt', 'Almonds'], calories: 280, protein: 20, carbs: 15, fat: 16 },
  { time: '1:00 PM', name: 'Lunch', foods: ['Grilled chicken breast', 'Brown rice', 'Vegetables'], calories: 650, protein: 45, carbs: 60, fat: 18 },
  { time: '4:00 PM', name: 'Pre-workout', foods: ['Banana', 'Peanut butter toast'], calories: 320, protein: 10, carbs: 48, fat: 12 },
  { time: '7:00 PM', name: 'Dinner', foods: ['Salmon', 'Sweet potato', 'Broccoli'], calories: 620, protein: 40, carbs: 50, fat: 22 },
];

export default function ClientNutrition() {
  const totalCals = meals.reduce((s, m) => s + m.calories, 0);
  const totalProtein = meals.reduce((s, m) => s + m.protein, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Nutrition Plan</h1>
        <p className="mt-1 text-muted-foreground">Your daily meal plan</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border bg-card p-4 card-shadow text-center">
          <p className="text-sm text-muted-foreground">Total Calories</p>
          <p className="text-2xl font-bold text-primary">{totalCals}</p>
        </div>
        <div className="rounded-lg border bg-card p-4 card-shadow text-center">
          <p className="text-sm text-muted-foreground">Protein</p>
          <p className="text-2xl font-bold">{totalProtein}g</p>
        </div>
        <div className="rounded-lg border bg-card p-4 card-shadow text-center">
          <p className="text-sm text-muted-foreground">Meals</p>
          <p className="text-2xl font-bold">{meals.length}</p>
        </div>
      </div>

      <div className="space-y-3">
        {meals.map((m, i) => (
          <div key={i} className="rounded-lg border bg-card p-5 card-shadow">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success"><Apple className="h-5 w-5" /></div>
              <div className="flex-1">
                <p className="font-semibold text-sm">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.time}</p>
              </div>
              <span className="text-sm font-semibold text-primary">{m.calories} cal</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {m.foods.map((f, j) => (
                <span key={j} className="rounded-full bg-muted px-3 py-1 text-xs">{f}</span>
              ))}
            </div>
            <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
              <span>P: {m.protein}g</span>
              <span>C: {m.carbs}g</span>
              <span>F: {m.fat}g</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
