import { DataTable } from '@/components/shared/DataTable';
import { Badge } from '@/components/ui/badge';
import { UserPlus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useEffect, useState } from "react";
import { getClients } from "@/services/trainerService";
import { useAuth } from "@/contexts/AuthContext";

export default function TrainerClients() {
  const [clients, setClients] = useState<any[]>([]);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const { user } = useAuth();
  const token = localStorage.getItem("fitpro_token");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        if (!token) return;
  
        const data = await getClients(token);
  
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
  
    fetchClients();
  }, [token]);

  const handleInvite = () => {
    if (!inviteEmail.trim()) return;
    toast({ title: 'Invitation sent', description: `Invited ${inviteEmail}` });
    setInviteEmail('');
    setShowInvite(false);
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
            onChange={e => setInviteEmail(e.target.value)}
            className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
          />
          <button
            onClick={handleInvite}
            className="gradient-primary rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            Send
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