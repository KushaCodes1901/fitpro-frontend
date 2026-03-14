import { useState } from 'react';
import { DataTable } from '@/components/shared/DataTable';
import { Badge } from '@/components/ui/badge';
import { Plus, UserPlus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const clients = [
  { id: '1', name: 'Mike Chen', email: 'mike@example.com', plan: 'Strength', status: 'active', lastActive: '2 hours ago' },
  { id: '2', name: 'Amy Liu', email: 'amy@example.com', plan: 'Weight Loss', status: 'active', lastActive: '1 day ago' },
  { id: '3', name: 'Carlos Ruiz', email: 'carlos@example.com', plan: 'Endurance', status: 'active', lastActive: '3 hours ago' },
];

export default function TrainerClients() {
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const handleInvite = () => {
    if (!inviteEmail.trim()) return;
    toast({ title: 'Invitation sent', description: `Invited ${inviteEmail}` });
    setInviteEmail(''); setShowInvite(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Clients</h1>
          <p className="mt-1 text-muted-foreground">Manage your client roster</p>
        </div>
        <button onClick={() => setShowInvite(!showInvite)} className="gradient-primary flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
          <UserPlus className="h-4 w-4" /> Invite Client
        </button>
      </div>

      {showInvite && (
        <div className="flex gap-2 rounded-lg border bg-card p-4 card-shadow">
          <input placeholder="Client email" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)}
            className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2" />
          <button onClick={handleInvite} className="gradient-primary rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground">Send</button>
          <button onClick={() => setShowInvite(false)} className="rounded-lg border px-4 py-2 text-sm hover:bg-muted">Cancel</button>
        </div>
      )}

      <DataTable
        searchable
        searchPlaceholder="Search clients..."
        columns={[
          { header: 'Name', accessor: 'name' },
          { header: 'Email', accessor: 'email' },
          { header: 'Plan', accessor: (r) => <Badge variant="secondary">{r.plan}</Badge> },
          { header: 'Last Active', accessor: 'lastActive' },
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
