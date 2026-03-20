import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { getTrainerPlans, getClients, assignPlanToClient } from "@/services/trainerService";

export default function TrainerPlans() {
  const [plans, setPlans] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [selectedClientEmail, setSelectedClientEmail] = useState<string>("");
  const [isAssigning, setIsAssigning] = useState(false);

  const fetchData = async () => {
    try {
      const [plansData, clientsData] = await Promise.all([
        getTrainerPlans(),
        getClients(),
      ]);

      const mappedClients = clientsData.map((client: any) => ({
        id: client.id,
        name: `${client.user?.firstName || ""} ${client.user?.lastName || ""}`.trim(),
        email: client.user?.email || "",
      }));

      setPlans(plansData);
      setClients(mappedClients);
    } catch (error) {
      console.error("Error fetching trainer plans:", error);
      toast({
        title: "Failed to load plans",
        description: "Could not fetch trainer plans",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAssign = async () => {
    if (!selectedPlanId || !selectedClientEmail) {
      toast({
        title: "Missing fields",
        description: "Please select a plan and a client",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsAssigning(true);

      await assignPlanToClient(selectedPlanId, selectedClientEmail);

      toast({
        title: "Plan assigned",
        description: "Workout plan assigned successfully",
      });

      setSelectedPlanId("");
      setSelectedClientEmail("");
      await fetchData();
    } catch (error: any) {
      toast({
        title: "Assignment failed",
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
        <h1 className="text-2xl font-bold">Workout Plans</h1>
        <p className="mt-1 text-muted-foreground">View and assign your workout plans</p>
      </div>

      <div className="rounded-lg border bg-card p-4 card-shadow space-y-4">
        <h2 className="text-lg font-semibold">Assign Plan to Client</h2>

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
          onClick={handleAssign}
          disabled={isAssigning}
          className="gradient-primary rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
        >
          {isAssigning ? "Assigning..." : "Assign Plan"}
        </button>
      </div>

      <div className="grid gap-4">
        {plans.length === 0 ? (
          <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground card-shadow">
            No workout plans found yet.
          </div>
        ) : (
          plans.map((plan) => (
            <div key={plan.id} className="rounded-lg border bg-card p-5 card-shadow">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {plan.description || "No description"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{plan.difficulty}</Badge>
                  <Badge variant="outline">
                    {plan.assignments?.length || 0} assigned
                  </Badge>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {(plan.days || []).map((day: any) => (
                  <div key={day.id} className="rounded-md border p-3">
                    <div className="font-medium">
                      Day {day.dayNumber}: {day.name}
                    </div>

                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      {(day.exercises || []).map((exercise: any) => (
                        <li key={exercise.id}>
                          {exercise.exerciseName} — {exercise.sets || "-"} sets, {exercise.reps || "-"} reps
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}