import { DataTable } from '@/components/shared/DataTable';
import { Badge } from '@/components/ui/badge';

const clients = [
  { id: '1', name: 'Mike Chen', email: 'mike.c@example.com', trainer: 'Sarah Johnson', status: 'active', joined: '2024-02-01' },
  { id: '2', name: 'Amy Liu', email: 'amy@example.com', trainer: 'Sarah Johnson', status: 'active', joined: '2024-03-15' },
  { id: '3', name: 'Carlos Ruiz', email: 'carlos@example.com', trainer: 'Mike Peters', status: 'active', joined: '2024-04-10' },
  { id: '4', name: 'Diana Ross', email: 'diana@example.com', trainer: 'Lisa Wang', status: 'inactive', joined: '2024-01-20' },
];

export default function AdminClients() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Clients</h1>
        <p className="mt-1 text-muted-foreground">Manage platform clients</p>
      </div>
      <DataTable
        searchable
        searchPlaceholder="Search clients..."
        columns={[
          { header: 'Name', accessor: 'name' },
          { header: 'Email', accessor: 'email' },
          { header: 'Trainer', accessor: 'trainer' },
          { header: 'Status', accessor: (r) => (
            <Badge variant={r.status === 'active' ? 'default' : 'secondary'} className={r.status === 'active' ? 'bg-success' : ''}>
              {r.status}
            </Badge>
          )},
          { header: 'Joined', accessor: 'joined' },
        ]}
        data={clients}
        actions={() => <button className="text-sm text-primary hover:underline">View</button>}
      />
    </div>
  );
}
