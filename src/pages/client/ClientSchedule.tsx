import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { getClientSessions } from "@/services/sessionService";

export default function ClientSchedule() {
  const [sessions, setSessions] = useState<any[]>([]);

  const fetchSessions = async () => {
    try {
      const data = await getClientSessions();
      setSessions(data);
    } catch (error) {
      console.error("Error fetching client sessions:", error);
      toast({
        title: "Failed to load schedule",
        description: "Could not fetch your sessions",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Schedule</h1>
        <p className="mt-1 text-muted-foreground">
          View your upcoming training sessions
        </p>
      </div>

      <div className="grid gap-4">
        {sessions.length === 0 ? (
          <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground card-shadow">
            No sessions scheduled yet.
          </div>
        ) : (
          sessions.map((session) => (
            <div key={session.id} className="rounded-lg border bg-card p-5 card-shadow">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold">
                    {session.trainer?.user?.firstName} {session.trainer?.user?.lastName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {session.trainer?.user?.email}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{session.type}</Badge>
                  <Badge variant="outline">{session.durationMin} min</Badge>
                  <Badge variant="outline">{session.status}</Badge>
                </div>
              </div>

              <div className="mt-3 text-sm">
                <div>
                  <span className="font-medium">Scheduled:</span>{" "}
                  {new Date(session.scheduledAt).toLocaleString()}
                </div>
                <div className="mt-1 text-muted-foreground">
                  {session.notes || "No notes"}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}