import { useEffect, useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { getAdminTrainers, updateUserStatus } from "@/services/adminService";

export default function AdminTrainers() {
  const [trainers, setTrainers] = useState<any[]>([]);

  const fetchTrainers = async () => {
    try {
      const data = await getAdminTrainers();

      const mapped = data.map((trainer: any) => ({
        id: trainer.id,
        name: `${trainer.firstName || ""} ${trainer.lastName || ""}`.trim(),
        email: trainer.email,
        status: trainer.isActive ? "Active" : "Inactive",
        experience: trainer.trainerProfile?.yearsExperience ?? "—",
        raw: trainer,
      }));

      setTrainers(mapped);
    } catch (error) {
      console.error("Error fetching trainers:", error);
      toast({
        title: "Failed to load trainers",
        description: "Could not fetch trainers",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const handleToggleStatus = async (row: any) => {
    try {
      const current = row.raw?.isActive;
      await updateUserStatus(row.id, !current);

      toast({
        title: "Trainer updated",
        description: `${row.name} is now ${current ? "inactive" : "active"}`,
      });

      await fetchTrainers();
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error?.response?.data?.message || "Could not update trainer",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Trainers</h1>
        <p className="mt-1 text-muted-foreground">
          Manage trainer accounts on the platform
        </p>
      </div>

      <DataTable
        searchable
        searchPlaceholder="Search trainers..."
        columns={[
          { header: "Name", accessor: "name" },
          { header: "Email", accessor: "email" },
          { header: "Experience", accessor: "experience" },
          {
            header: "Status",
            accessor: (row) => (
              <Badge variant={row.status === "Active" ? "secondary" : "outline"}>
                {row.status}
              </Badge>
            ),
          },
        ]}
        data={trainers}
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