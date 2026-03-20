import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { getClientNutritionPlans } from "@/services/clientService";

export default function ClientNutrition() {
  const [assignments, setAssignments] = useState<any[]>([]);

  const fetchNutrition = async () => {
    try {
      const data = await getClientNutritionPlans();
      setAssignments(data);
    } catch (error) {
      console.error("Error fetching nutrition plans:", error);
      toast({
        title: "Failed to load nutrition plans",
        description: "Could not fetch nutrition data",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchNutrition();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Nutrition</h1>
        <p className="mt-1 text-muted-foreground">
          View your assigned meal plans and daily nutrition targets
        </p>
      </div>

      {assignments.length === 0 ? (
        <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground card-shadow">
          No nutrition plans assigned yet.
        </div>
      ) : (
        <div className="grid gap-4">
          {assignments.map((assignment) => {
            const plan = assignment.plan;

            return (
              <div key={assignment.id} className="rounded-lg border bg-card p-5 card-shadow">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{plan?.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {plan?.description || "No description"}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">
                      {plan?.dailyCalories || 0} kcal
                    </Badge>
                    <Badge variant="outline">
                      Protein: {plan?.proteinGrams || 0}g
                    </Badge>
                    <Badge variant="outline">
                      Carbs: {plan?.carbsGrams || 0}g
                    </Badge>
                    <Badge variant="outline">
                      Fat: {plan?.fatGrams || 0}g
                    </Badge>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  {(plan?.meals || []).length === 0 ? (
                    <div className="rounded-md border p-3 text-sm text-muted-foreground">
                      No meals added to this plan yet.
                    </div>
                  ) : (
                    (plan.meals || []).map((meal: any) => (
                      <div key={meal.id} className="rounded-md border p-3">
                        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                          <div>
                            <div className="font-medium">{meal.name}</div>
                            <p className="text-sm text-muted-foreground">
                              {meal.description || "No description"}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">
                              {meal.calories || 0} kcal
                            </Badge>
                            <Badge variant="outline">
                              P: {meal.protein || 0}g
                            </Badge>
                            <Badge variant="outline">
                              C: {meal.carbs || 0}g
                            </Badge>
                            <Badge variant="outline">
                              F: {meal.fat || 0}g
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}