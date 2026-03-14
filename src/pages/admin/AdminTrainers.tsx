import { DataTable } from '@/components/shared/DataTable';
import { Badge } from '@/components/ui/badge';

const trainers = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah@example.com', clients: 12, status: 'active', joined: '2024-01-15' },
  { id: '2', name: 'Mike Peters', email: 'mike@example.com', clients: 8, status: 'active', joined: '2024-02-20' },
  { id: '3', name: 'Lisa Wang', email: 'lisa@example.com', clients: 15, status: 'active', joined: '2024-03-10' },
  { id: '4', name: 'Tom Brown', email: 'tom@example.com', clients: 0, status: 'inactive', joined: '2024-01-05' },
  { id: '5', name: 'Emma Davis', email: 'emma@example.com', clients: 6, status: 'active', joined: '2024-04-01' },
];

export default function AdminTrainers() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Trainers</h1>
        <p className="mt-1 text-muted-foreground">Manage platform trainers</p>
      </div>
      <DataTable
        searchable
        searchPlaceholder="Search trainers..."
        columns={[
          { header: 'Name', accessor: 'name' },
          { header: 'Email', accessor: 'email' },
          { header: 'Clients', accessor: 'clients' },
          { header: 'Status', accessor: (r) => (
            <Badge variant={r.status === 'active' ? 'default' : 'secondary'} className={r.status === 'active' ? 'bg-success' : ''}>
              {r.status}
            </Badge>
          )},
          { header: 'Joined', accessor: 'joined' },
        ]}
        data={trainers}
        actions={(row) => (
          <button className="text-sm text-primary hover:underline">
            {row.status === 'active' ? 'Deactivate' : 'Activate'}
          </button>
        )}
      />
    </div>
  );
}
