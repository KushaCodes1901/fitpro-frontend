import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { getClients } from "@/services/trainerService";
import { getTrainerSessions, createTrainerSession } from "@/services/sessionService";

export default function TrainerSchedule() {
  const [clients, setClients] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const [form, setForm] = useState({
    clientEmail: "",
    scheduledAt: "",
    durationMin: "60",
    type: "ONLINE",
    notes: "",
  });

  const fetchData = async () => {
    try {
      const [clientsData, sessionsData] = await Promise.all([
        getClients(),
        getTrainerSessions(),
      ]);

      const mappedClients = clientsData.map((client: any) => ({
        id: client.id,
        name: `${client.user?.firstName || ""} ${client.user?.lastName || ""}`.trim(),
        email: client.user?.email || "",
      }));

      setClients(mappedClients);
      setSessions(sessionsData);
    } catch (error) {
      console.error("Error fetching trainer schedule:", error);
      toast({
        title: "Failed to load schedule",
        description: "Could not fetch clients or sessions",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateSession = async () => {
    if (!form.clientEmail || !form.scheduledAt) {
      toast({
        title: "Missing fields",
        description: "Please select a client and date/time",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsCreating(true);

      await createTrainerSession({
        clientEmail: form.clientEmail,
        scheduledAt: new Date(form.scheduledAt).toISOString(),
        durationMin: Number(form.durationMin) || 60,
        type: form.type as "ONLINE" | "IN_PERSON",
        notes: form.notes || undefined,
      });

      toast({
        title: "Session created",
        description: "Training session scheduled successfully",
      });

      setForm({
        clientEmail: "",
        scheduledAt: "",
        durationMin: "60",
        type: "ONLINE",
        notes: "",
      });

      await fetchData();
    } catch (error: any) {
      toast({
        title: "Failed to create session",
        description: error?.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Schedule</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your upcoming client sessions
        </p>
      </div>

      <div className="rounded-lg border bg-card p-5 card-shadow space-y-4">
        <h2 className="text-lg font-semibold">Create New Session</h2>

        <div className="grid gap-3 md:grid-cols-2">
          <select
            name="clientEmail"
            value={form.clientEmail}
            onChange={handleChange}
            className="rounded-lg border bg-background px-3 py-2 text-sm"
          >
            <option value="">Select a client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.email}>
                {client.name} ({client.email})
              </option>
            ))}
          </select>

          <input
            type="datetime-local"
            name="scheduledAt"
            value={form.scheduledAt}
            onChange={handleChange}
            className="rounded-lg border bg-background px-3 py-2 text-sm"
          />
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <input
            type="number"
            name="durationMin"
            value={form.durationMin}
            onChange={handleChange}
            placeholder="Duration in minutes"
            className="rounded-lg border bg-background px-3 py-2 text-sm"
          />

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="rounded-lg border bg-background px-3 py-2 text-sm"
          >
            <option value="ONLINE">Online</option>
            <option value="IN_PERSON">In Person</option>
          </select>
        </div>

        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Session notes"
          className="min-h-[100px] w-full rounded-lg border bg-background px-3 py-2 text-sm"
        />

        <button
          onClick={handleCreateSession}
          disabled={isCreating}
          className="gradient-primary rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
        >
          {isCreating ? "Creating..." : "Create Session"}
        </button>
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
                    {session.client?.user?.firstName} {session.client?.user?.lastName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {session.client?.user?.email}
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