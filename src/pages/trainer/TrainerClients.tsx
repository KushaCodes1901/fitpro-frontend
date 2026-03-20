import { DataTable } from '@/components/shared/DataTable';
import { Badge } from '@/components/ui/badge';
import { UserPlus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useEffect, useState } from "react";
import { getClients, assignClient } from "@/services/trainerService";

export default function TrainerClients() {
  const [clients, setClients] = useState<any[]>([]);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [isInviting, setIsInviting] = useState(false);

  const token = localStorage.getItem("fitpro_token");

  const fetchClients = async () => {
    try {
      if (!token) return;

      const data = await getClients();

      const mappedClients = data.map((client: any) => ({
        id: client.id,
        name: `${client.user?.firstName || ""} ${client.user?.lastName || ""}`.trim(),
        email: client.user?.email || "",
        plan: "No Plan",
        lastActive: "—",
        raw: client,
      }));

      setClients(mappedClients);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [token]);

  const handleInvite = async () => {
    if (!inviteEmail.trim()) return;

    try {
      setIsInviting(true);

      await assignClient(inviteEmail);

      toast({
        title: "Client assigned",
        description: `${inviteEmail} has been added to your client list.`,
      });

      setInviteEmail("");
      setShowInvite(false);

      await fetchClients();
    } catch (error: any) {
      toast({
        title: "Failed to assign client",
        description: error?.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsInviting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Clients</h1>
          <p className="mt-1 text-muted-foreground">Manage your client roster</p>
        </div>
        <button
          onClick={() => setShowInvite(!showInvite)}
          className="gradient-primary flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <UserPlus className="h-4 w-4" /> Invite Client
        </button>
      </div>

      {showInvite && (
        <div className="flex gap-2 rounded-lg border bg-card p-4 card-shadow">
          <input
            placeholder="Client email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
          />
          <button
            onClick={handleInvite}
            disabled={isInviting}
            className="gradient-primary rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
          >
            {isInviting ? "Sending..." : "Send"}
          </button>
          <button
            onClick={() => setShowInvite(false)}
            className="rounded-lg border px-4 py-2 text-sm hover:bg-muted"
          >
            Cancel
          </button>
        </div>
      )}

      <DataTable
        searchable
        searchPlaceholder="Search clients..."
        columns={[
          { header: 'Name', accessor: 'name' },
          { header: 'Email', accessor: 'email' },
          { header: 'Plan', accessor: (r) => <Badge variant="secondary">{r.plan || "No Plan"}</Badge> },
          { header: 'Last Active', accessor: (r) => r.lastActive || "—" },
        ]}
        data={clients}
        actions={() => (
          <div className="flex gap-2 justify-end">
            <button className="text-sm text-primary hover:underline">View</button>
            <button className="text-sm text-destructive hover:underline">Remove</button>
          </div>
        )}
      />
    </div>
  );
}