import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { getAdminAnalytics } from "@/services/adminService";

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<any>(null);

  const fetchAnalytics = async () => {
    try {
      const data = await getAdminAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      toast({
        title: "Failed to load analytics",
        description: "Could not fetch admin dashboard data",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const cards = [
    { label: "Total Trainers", value: analytics?.totalTrainers ?? 0 },
    { label: "Total Clients", value: analytics?.totalClients ?? 0 },
    { label: "Active Users", value: analytics?.activeUsers ?? 0 },
    { label: "Workout Plans", value: analytics?.totalWorkoutPlans ?? 0 },
    { label: "Nutrition Plans", value: analytics?.totalNutritionPlans ?? 0 },
    { label: "Sessions", value: analytics?.totalSessions ?? 0 },
    { label: "Messages", value: analytics?.totalMessages ?? 0 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Overview of platform activity and usage
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-lg border bg-card p-5 card-shadow">
            <div className="text-sm text-muted-foreground">{card.label}</div>
            <div className="mt-2 text-3xl font-bold">{card.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}