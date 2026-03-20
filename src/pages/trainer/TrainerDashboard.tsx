import { useEffect, useMemo, useState } from "react";
import { Users, Calendar, Activity, Dumbbell } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { getTrainerDashboardData } from "@/services/dashboardServices";

export default function TrainerDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState<any[]>([]);
  const [plans, setPlans] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getTrainerDashboardData();
        setClients(data.clients || []);
        setPlans(data.plans || []);
        setSessions(data.sessions || []);
      } catch (error) {
        console.error("Error loading trainer dashboard:", error);
        toast({
          title: "Failed to load dashboard",
          description: "Could not fetch trainer dashboard data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const today = new Date();

  const todaysSessions = useMemo(() => {
    return sessions.filter((session) => {
      const sessionDate = new Date(session.scheduledAt);
      return sessionDate.toDateString() === today.toDateString();
    });
  }, [sessions]);

  const sessionsThisWeek = useMemo(() => {
    const startOfWeek = new Date(today);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    return sessions.filter((session) => {
      const sessionDate = new Date(session.scheduledAt);
      return sessionDate >= startOfWeek && sessionDate < endOfWeek;
    });
  }, [sessions]);

  const recentClients = useMemo(() => {
    return clients.slice(0, 5).map((client) => ({
      name: `${client.user?.firstName || ""} ${client.user?.lastName || ""}`.trim(),
      action: "Assigned client",
      time: client.user?.createdAt
        ? new Date(client.user.createdAt).toLocaleDateString()
        : "Recently",
    }));
  }, [clients]);

  if (loading) {
    return <div className="p-4">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Trainer Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Welcome back, {user?.name || "Trainer"}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Clients"
          value={clients.length}
          icon={<Users className="h-5 w-5 text-primary" />}
        />
        <StatCard
          title="Sessions This Week"
          value={sessionsThisWeek.length}
          icon={<Calendar className="h-5 w-5 text-info" />}
        />
        <StatCard
          title="Active Plans"
          value={plans.length}
          icon={<Dumbbell className="h-5 w-5 text-success" />}
        />
        <StatCard
          title="Today's Sessions"
          value={todaysSessions.length}
          icon={<Activity className="h-5 w-5 text-warning" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border bg-card p-6 card-shadow">
          <h2 className="font-semibold">Recent Client Activity</h2>
          <div className="mt-4 divide-y">
            {recentClients.length === 0 ? (
              <div className="py-3 text-sm text-muted-foreground">
                No client activity yet.
              </div>
            ) : (
              recentClients.map((client, i) => (
                <div key={i} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium">{client.name}</p>
                    <p className="text-sm text-muted-foreground">{client.action}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{client.time}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 card-shadow">
          <h2 className="font-semibold">Today's Schedule</h2>
          <div className="mt-4 space-y-3">
            {todaysSessions.length === 0 ? (
              <div className="text-sm text-muted-foreground">
                No sessions scheduled for today.
              </div>
            ) : (
              todaysSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center gap-3 rounded-lg bg-muted p-3 text-sm"
                >
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="font-medium">
                    {session.client?.user?.firstName} {session.client?.user?.lastName} —{" "}
                    {new Date(session.scheduledAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}