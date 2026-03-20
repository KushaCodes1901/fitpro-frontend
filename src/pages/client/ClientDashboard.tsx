import { useEffect, useMemo, useState } from "react";
import { Dumbbell, Calendar, TrendingUp, Apple } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { getClientDashboardData } from "@/services/dashboardServices";

export default function ClientDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [workoutHistory, setWorkoutHistory] = useState<any[]>([]);
  const [progress, setProgress] = useState<any>({ measurements: [], workouts: [] });
  const [nutritionPlans, setNutritionPlans] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getClientDashboardData();
        setPlans(data.plans || []);
        setSessions(data.sessions || []);
        setWorkoutHistory(data.workoutHistory || []);
        setProgress(data.progress || { measurements: [], workouts: [] });
        setNutritionPlans(data.nutritionPlans || []);
      } catch (error) {
        console.error("Error loading client dashboard:", error);
        toast({
          title: "Failed to load dashboard",
          description: "Could not fetch client dashboard data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const activeAssignment = plans[0];
  const todaysWorkoutDay = activeAssignment?.plan?.days?.[0];
  const nextSession = sessions[0];
  const latestMeasurement = progress?.measurements?.[0];
  const currentNutrition = nutritionPlans[0];

  const workoutsThisWeek = useMemo(() => {
    const today = new Date();
    const startOfWeek = new Date(today);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);
    startOfWeek.setHours(0, 0, 0, 0);

    return (workoutHistory || []).filter((workout: any) => {
      const completedAt = workout.completedAt ? new Date(workout.completedAt) : null;
      return completedAt && completedAt >= startOfWeek;
    });
  }, [workoutHistory]);

  if (loading) {
    return <div className="p-4">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">My Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Welcome back, {user?.name || "Client"}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Today's Workout"
          value={todaysWorkoutDay?.name || "No workout"}
          icon={<Dumbbell className="h-5 w-5 text-primary" />}
        />
        <StatCard
          title="Next Session"
          value={
            nextSession
              ? new Date(nextSession.scheduledAt).toLocaleDateString()
              : "No session"
          }
          icon={<Calendar className="h-5 w-5 text-info" />}
        />
        <StatCard
          title="Weight"
          value={latestMeasurement?.weight ? `${latestMeasurement.weight} kg` : "—"}
          icon={<TrendingUp className="h-5 w-5 text-success" />}
        />
        <StatCard
          title="Calories Today"
          value={currentNutrition?.plan?.dailyCalories || 0}
          icon={<Apple className="h-5 w-5 text-warning" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border bg-card p-6 card-shadow">
          <h2 className="font-semibold">
            Today's Workout — {todaysWorkoutDay?.name || "No assigned workout"}
          </h2>

          <div className="mt-4 space-y-2">
            {!todaysWorkoutDay?.exercises?.length ? (
              <div className="text-sm text-muted-foreground">
                No exercises assigned yet.
              </div>
            ) : (
              todaysWorkoutDay.exercises.map((exercise: any) => (
                <div
                  key={exercise.id}
                  className="flex items-center gap-3 rounded-lg bg-muted/50 p-3"
                >
                  <span className="flex-1 text-sm font-medium">
                    {exercise.exerciseName}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {exercise.sets || "-"} × {exercise.reps || "-"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 card-shadow">
          <h2 className="font-semibold">Progress Summary</h2>
          <div className="mt-4 space-y-4">
            <div className="rounded-lg bg-muted/50 p-4">
              <div className="text-sm text-muted-foreground">Workouts This Week</div>
              <div className="mt-1 text-2xl font-bold">{workoutsThisWeek.length}</div>
            </div>

            <div className="rounded-lg bg-muted/50 p-4">
              <div className="text-sm text-muted-foreground">Current Nutrition Plan</div>
              <div className="mt-1 text-lg font-semibold">
                {currentNutrition?.plan?.name || "No nutrition plan"}
              </div>
            </div>

            <div className="rounded-lg bg-muted/50 p-4">
              <div className="text-sm text-muted-foreground">Upcoming Session</div>
              <div className="mt-1 text-lg font-semibold">
                {nextSession
                  ? new Date(nextSession.scheduledAt).toLocaleString()
                  : "No upcoming sessions"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}