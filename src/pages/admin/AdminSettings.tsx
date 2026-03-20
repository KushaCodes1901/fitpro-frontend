import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { getAdminSettings, updateAdminSettings } from "@/services/adminService";

export default function AdminSettings() {
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState({
    appName: "",
    allowRegistration: true,
    maintenanceMode: false,
    supportEmail: "",
  });

  const fetchSettings = async () => {
    try {
      const data = await getAdminSettings();

      setForm({
        appName: data.appName || "",
        allowRegistration: data.allowRegistration ?? true,
        maintenanceMode: data.maintenanceMode ?? false,
        supportEmail: data.supportEmail || "",
      });
    } catch (error) {
      console.error("Error fetching admin settings:", error);
      toast({
        title: "Failed to load settings",
        description: "Could not fetch admin settings",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      await updateAdminSettings(form);

      toast({
        title: "Settings saved",
        description: "Admin settings updated successfully",
      });

      await fetchSettings();
    } catch (error: any) {
      toast({
        title: "Failed to save settings",
        description: error?.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="mt-1 text-muted-foreground">
          Configure global platform settings
        </p>
      </div>

      <div className="rounded-lg border bg-card p-5 card-shadow space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium">Application Name</label>
          <input
            name="appName"
            value={form.appName}
            onChange={handleChange}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
            placeholder="FitPro"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Support Email</label>
          <input
            name="supportEmail"
            value={form.supportEmail}
            onChange={handleChange}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
            placeholder="support@fitpro.com"
          />
        </div>

        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <div className="font-medium">Allow Registration</div>
            <div className="text-sm text-muted-foreground">
              Enable or disable new user signups
            </div>
          </div>
          <input
            type="checkbox"
            name="allowRegistration"
            checked={form.allowRegistration}
            onChange={handleChange}
            className="h-4 w-4"
          />
        </div>

        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <div className="font-medium">Maintenance Mode</div>
            <div className="text-sm text-muted-foreground">
              Put the platform into maintenance mode
            </div>
          </div>
          <input
            type="checkbox"
            name="maintenanceMode"
            checked={form.maintenanceMode}
            onChange={handleChange}
            className="h-4 w-4"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="gradient-primary rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
}