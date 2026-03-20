import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import {
  getCurrentUser,
  updateCurrentUser,
  updateAvatar,
} from "@/services/profileService";

export default function AdminProfile() {
  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    avatarUrl: "",
    email: "",
    role: "",
  });

  const fetchProfile = async () => {
    try {
      const userData = await getCurrentUser();

      setForm({
        firstName: userData.firstName || userData.name?.split(" ")[0] || "",
        lastName:
          userData.lastName || userData.name?.split(" ").slice(1).join(" ") || "",
        avatarUrl: userData.avatarUrl || userData.avatar || "",
        email: userData.email || "",
        role: userData.role || "",
      });
    } catch (error) {
      console.error("Error fetching admin profile:", error);
      toast({
        title: "Failed to load profile",
        description: "Could not fetch admin profile data",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      await Promise.all([
        updateCurrentUser({
          firstName: form.firstName,
          lastName: form.lastName,
        }),
        updateAvatar(form.avatarUrl),
      ]);

      toast({
        title: "Profile updated",
        description: "Your admin profile was saved successfully",
      });

      await fetchProfile();
    } catch (error: any) {
      toast({
        title: "Failed to save profile",
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
        <h1 className="text-2xl font-bold">Admin Profile</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your administrator account details
        </p>
      </div>

      <div className="rounded-lg border bg-card p-5 card-shadow space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">First Name</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Last Name</label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Avatar URL</label>
          <input
            name="avatarUrl"
            value={form.avatarUrl}
            onChange={handleChange}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
            placeholder="https://example.com/avatar.jpg"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input
              value={form.email}
              disabled
              className="w-full rounded-lg border bg-muted px-3 py-2 text-sm text-muted-foreground"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Role</label>
            <input
              value={form.role}
              disabled
              className="w-full rounded-lg border bg-muted px-3 py-2 text-sm text-muted-foreground"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="gradient-primary rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </div>
  );
}