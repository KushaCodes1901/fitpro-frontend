import { useEffect, useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { getAdminClients, updateUserStatus } from "@/services/adminService";

export default function AdminClients() {
  const [clients, setClients] = useState<any[]>([]);

  const fetchClients = async () => {
    try {
      const data = await getAdminClients();

      const mapped = data.map((client: any) => ({
        id: client.id,
        name: `${client.firstName || ""} ${client.lastName || ""}`.trim(),
        email: client.email,
        trainer:
          client.clientProfile?.trainer?.user
            ? `${client.clientProfile.trainer.user.firstName || ""} ${client.clientProfile.trainer.user.lastName || ""}`.trim()
            : "Unassigned",
        status: client.isActive ? "Active" : "Inactive",
        raw: client,
      }));

      setClients(mapped);
    } catch (error) {
      console.error("Error fetching clients:", error);
      toast({
        title: "Failed to load clients",
        description: "Could not fetch clients",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleToggleStatus = async (row: any) => {
    try {
      const current = row.raw?.isActive;
      await updateUserStatus(row.id, !current);

      toast({
        title: "Client updated",
        description: `${row.name} is now ${current ? "inactive" : "active"}`,
      });

      await fetchClients();
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error?.response?.data?.message || "Could not update client",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Clients</h1>
        <p className="mt-1 text-muted-foreground">
          Manage client accounts on the platform
        </p>
      </div>

      <DataTable
        searchable
        searchPlaceholder="Search clients..."
        columns={[
          { header: "Name", accessor: "name" },
          { header: "Email", accessor: "email" },
          { header: "Trainer", accessor: "trainer" },
          {
            header: "Status",
            accessor: (row) => (
              <Badge variant={row.status === "Active" ? "secondary" : "outline"}>
                {row.status}
              </Badge>
            ),
          },
        ]}
        data={clients}
        actions={(row) => (
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => handleToggleStatus(row)}
              className="text-sm text-primary hover:underline"
            >
              {row.status === "Active" ? "Deactivate" : "Activate"}
            </button>
          </div>
        )}
      />
    </div>
  );
}