import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { getClients } from "@/services/trainerService";
import {
  getTrainerNutritionPlans,
  createNutritionPlan,
  assignNutritionPlanToClient,
} from "@/services/nutritionService";

export default function TrainerNutrition() {
  const [plans, setPlans] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [selectedClientEmail, setSelectedClientEmail] = useState("");
  const [isAssigning, setIsAssigning] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    dailyCalories: "",
    proteinGrams: "",
    carbsGrams: "",
    fatGrams: "",
    breakfastName: "",
    breakfastDescription: "",
    breakfastCalories: "",
    breakfastProtein: "",
    breakfastCarbs: "",
    breakfastFat: "",
    lunchName: "",
    lunchDescription: "",
    lunchCalories: "",
    lunchProtein: "",
    lunchCarbs: "",
    lunchFat: "",
  });

  const fetchData = async () => {
    try {
      const [plansData, clientsData] = await Promise.all([
        getTrainerNutritionPlans(),
        getClients(),
      ]);

      const mappedClients = clientsData.map((client: any) => ({
        id: client.id,
        name: `${client.user?.firstName || ""} ${client.user?.lastName || ""}`.trim(),
        email: client.user?.email || "",
      }));

      setPlans(plansData || []);
      setClients(mappedClients);
    } catch (error) {
      console.error("Error fetching nutrition data:", error);
      toast({
        title: "Error",
        description: "Failed to load nutrition plans",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreatePlan = async () => {
    if (!form.name.trim()) {
      toast({
        title: "Missing name",
        description: "Nutrition plan name is required",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsCreating(true);

      const meals = [
        form.breakfastName.trim()
          ? {
              name: form.breakfastName,
              description: form.breakfastDescription || undefined,
              calories: form.breakfastCalories ? Number(form.breakfastCalories) : undefined,
              protein: form.breakfastProtein ? Number(form.breakfastProtein) : undefined,
              carbs: form.breakfastCarbs ? Number(form.breakfastCarbs) : undefined,
              fat: form.breakfastFat ? Number(form.breakfastFat) : undefined,
              sortOrder: 1,
            }
          : null,
        form.lunchName.trim()
          ? {
              name: form.lunchName,
              description: form.lunchDescription || undefined,
              calories: form.lunchCalories ? Number(form.lunchCalories) : undefined,
              protein: form.lunchProtein ? Number(form.lunchProtein) : undefined,
              carbs: form.lunchCarbs ? Number(form.lunchCarbs) : undefined,
              fat: form.lunchFat ? Number(form.lunchFat) : undefined,
              sortOrder: 2,
            }
          : null,
      ].filter(Boolean);

      await createNutritionPlan({
        name: form.name,
        description: form.description || undefined,
        dailyCalories: form.dailyCalories ? Number(form.dailyCalories) : undefined,
        proteinGrams: form.proteinGrams ? Number(form.proteinGrams) : undefined,
        carbsGrams: form.carbsGrams ? Number(form.carbsGrams) : undefined,
        fatGrams: form.fatGrams ? Number(form.fatGrams) : undefined,
        meals: meals as any[],
      });

      toast({
        title: "Plan created",
        description: "Nutrition plan created successfully",
      });

      setForm({
        name: "",
        description: "",
        dailyCalories: "",
        proteinGrams: "",
        carbsGrams: "",
        fatGrams: "",
        breakfastName: "",
        breakfastDescription: "",
        breakfastCalories: "",
        breakfastProtein: "",
        breakfastCarbs: "",
        breakfastFat: "",
        lunchName: "",
        lunchDescription: "",
        lunchCalories: "",
        lunchProtein: "",
        lunchCarbs: "",
        lunchFat: "",
      });

      await fetchData();
    } catch (error: any) {
      toast({
        title: "Create failed",
        description: error?.response?.data?.message || "Could not create plan",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleAssignPlan = async () => {
    if (!selectedPlanId || !selectedClientEmail) {
      toast({
        title: "Missing fields",
        description: "Select a plan and a client",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsAssigning(true);

      await assignNutritionPlanToClient(selectedPlanId, selectedClientEmail);

      toast({
        title: "Plan assigned",
        description: "Nutrition plan assigned successfully",
      });

      setSelectedPlanId("");
      setSelectedClientEmail("");
      await fetchData();
    } catch (error: any) {
      toast({
        title: "Assign failed",
        description: error?.response?.data?.message || "Could not assign plan",
        variant: "destructive",
      });
    } finally {
      setIsAssigning(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Nutrition Plans</h1>
        <p className="text-muted-foreground">Create and assign nutrition plans</p>
      </div>

      <div className="rounded-lg border bg-card p-5 space-y-4">
        <h2 className="text-lg font-semibold">Create Nutrition Plan</h2>

        <div className="grid gap-3 md:grid-cols-2">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Plan name"
            className="rounded-lg border bg-background px-3 py-2 text-sm"
          />
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="rounded-lg border bg-background px-3 py-2 text-sm"
          />
          <input
            name="dailyCalories"
            value={form.dailyCalories}
            onChange={handleChange}
            placeholder="Daily calories"
            className="rounded-lg border bg-background px-3 py-2 text-sm"
          />
          <input
            name="proteinGrams"
            value={form.proteinGrams}
            onChange={handleChange}
            placeholder="Protein grams"
            className="rounded-lg border bg-background px-3 py-2 text-sm"
          />
          <input
            name="carbsGrams"
            value={form.carbsGrams}
            onChange={handleChange}
            placeholder="Carbs grams"
            className="rounded-lg border bg-background px-3 py-2 text-sm"
          />
          <input
            name="fatGrams"
            value={form.fatGrams}
            onChange={handleChange}
            placeholder="Fat grams"
            className="rounded-lg border bg-background px-3 py-2 text-sm"
          />
        </div>

        <div className="rounded-lg border p-4 space-y-3">
          <h3 className="font-medium">Breakfast</h3>
          <div className="grid gap-3 md:grid-cols-2">
            <input
              name="breakfastName"
              value={form.breakfastName}
              onChange={handleChange}
              placeholder="Meal name"
              className="rounded-lg border bg-background px-3 py-2 text-sm"
            />
            <input
              name="breakfastDescription"
              value={form.breakfastDescription}
              onChange={handleChange}
              placeholder="Description"
              className="rounded-lg border bg-background px-3 py-2 text-sm"
            />
            <input
              name="breakfastCalories"
              value={form.breakfastCalories}
              onChange={handleChange}
              placeholder="Calories"
              className="rounded-lg border bg-background px-3 py-2 text-sm"
            />
            <input
              name="breakfastProtein"
              value={form.breakfastProtein}
              onChange={handleChange}
              placeholder="Protein"
              className="rounded-lg border bg-background px-3 py-2 text-sm"
            />
            <input
              name="breakfastCarbs"
              value={form.breakfastCarbs}
              onChange={handleChange}
              placeholder="Carbs"
              className="rounded-lg border bg-background px-3 py-2 text-sm"
            />
            <input
              name="breakfastFat"
              value={form.breakfastFat}
              onChange={handleChange}
              placeholder="Fat"
              className="rounded-lg border bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="rounded-lg border p-4 space-y-3">
          <h3 className="font-medium">Lunch</h3>
          <div className="grid gap-3 md:grid-cols-2">
            <input
              name="lunchName"
              value={form.lunchName}
              onChange={handleChange}
              placeholder="Meal name"
              className="rounded-lg border bg-background px-3 py-2 text-sm"
            />
            <input
              name="lunchDescription"
              value={form.lunchDescription}
              onChange={handleChange}
              placeholder="Description"
              className="rounded-lg border bg-background px-3 py-2 text-sm"
            />
            <input
              name="lunchCalories"
              value={form.lunchCalories}
              onChange={handleChange}
              placeholder="Calories"
              className="rounded-lg border bg-background px-3 py-2 text-sm"
            />
            <input
              name="lunchProtein"
              value={form.lunchProtein}
              onChange={handleChange}
              placeholder="Protein"
              className="rounded-lg border bg-background px-3 py-2 text-sm"
            />
            <input
              name="lunchCarbs"
              value={form.lunchCarbs}
              onChange={handleChange}
              placeholder="Carbs"
              className="rounded-lg border bg-background px-3 py-2 text-sm"
            />
            <input
              name="lunchFat"
              value={form.lunchFat}
              onChange={handleChange}
              placeholder="Fat"
              className="rounded-lg border bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>

        <button
          onClick={handleCreatePlan}
          disabled={isCreating}
          className="gradient-primary rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
        >
          {isCreating ? "Creating..." : "Create Plan"}
        </button>
      </div>

      <div className="rounded-lg border bg-card p-5 space-y-4">
        <h2 className="text-lg font-semibold">Assign Nutrition Plan</h2>

        <div className="grid gap-3 md:grid-cols-2">
          <select
            value={selectedPlanId}
            onChange={(e) => setSelectedPlanId(e.target.value)}
            className="rounded-lg border bg-background px-3 py-2 text-sm"
          >
            <option value="">Select a plan</option>
            {plans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name}
              </option>
            ))}
          </select>

          <select
            value={selectedClientEmail}
            onChange={(e) => setSelectedClientEmail(e.target.value)}
            className="rounded-lg border bg-background px-3 py-2 text-sm"
          >
            <option value="">Select a client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.email}>
                {client.name} ({client.email})
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleAssignPlan}
          disabled={isAssigning}
          className="gradient-primary rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
        >
          {isAssigning ? "Assigning..." : "Assign Plan"}
        </button>
      </div>

      <div className="grid gap-4">
        {plans.length === 0 ? (
          <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
            No nutrition plans found.
          </div>
        ) : (
          plans.map((plan) => (
            <div key={plan.id} className="rounded-lg border bg-card p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {plan.description || "No description"}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{plan.dailyCalories || 0} kcal</Badge>
                  <Badge variant="outline">P: {plan.proteinGrams || 0}g</Badge>
                  <Badge variant="outline">C: {plan.carbsGrams || 0}g</Badge>
                  <Badge variant="outline">F: {plan.fatGrams || 0}g</Badge>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {(plan.meals || []).map((meal: any) => (
                  <div key={meal.id} className="rounded-md border p-3">
                    <div className="font-medium">{meal.name}</div>
                    <p className="text-sm text-muted-foreground">
                      {meal.description || "No description"}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2 text-sm">
                      <Badge variant="secondary">{meal.calories || 0} kcal</Badge>
                      <Badge variant="outline">P: {meal.protein || 0}g</Badge>
                      <Badge variant="outline">C: {meal.carbs || 0}g</Badge>
                      <Badge variant="outline">F: {meal.fat || 0}g</Badge>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <Badge variant="outline">
                  {plan.assignments?.length || 0} assigned
                </Badge>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}