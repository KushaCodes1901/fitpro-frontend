import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import {
  getClientProfile,
  updateCurrentUser,
  updateEmail,
  updatePassword,
  updateAvatar,
  updateClientProfile,
} from "@/services/profileService";

export default function ClientProfile() {
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingSecurity, setIsSavingSecurity] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    avatarUrl: "",
    dateOfBirth: "",
    gender: "",
    height: "",
    fitnessGoal: "",
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const fetchProfile = async () => {
    try {
      const userData = await getClientProfile();

      setForm({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        avatarUrl: userData.avatarUrl || userData.avatar || "",
        dateOfBirth: userData.clientProfile?.dateOfBirth
          ? new Date(userData.clientProfile.dateOfBirth).toISOString().split("T")[0]
          : "",
        gender: userData.clientProfile?.gender || "",
        height: userData.clientProfile?.height?.toString() || "",
        fitnessGoal: userData.clientProfile?.fitnessGoal || "",
      });
    } catch (error) {
      console.error("Error fetching client profile:", error);
      toast({
        title: "Failed to load profile",
        description: "Could not fetch client profile data",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecurity((prev) => ({
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
        updateEmail(form.email),
        updateAvatar(form.avatarUrl),
        updateClientProfile({
          dateOfBirth: form.dateOfBirth || undefined,
          gender: form.gender || undefined,
          height: form.height ? Number(form.height) : undefined,
          fitnessGoal: form.fitnessGoal || undefined,
        }),
      ]);

      toast({
        title: "Profile updated",
        description: "Your client profile was saved successfully",
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

  const handlePasswordSave = async () => {
    if (!security.currentPassword || !security.newPassword) {
      toast({
        title: "Missing fields",
        description: "Enter both current and new password",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSavingSecurity(true);

      await updatePassword({
        currentPassword: security.currentPassword,
        newPassword: security.newPassword,
      });

      toast({
        title: "Password updated",
        description: "Your password was changed successfully",
      });

      setSecurity({
        currentPassword: "",
        newPassword: "",
      });
    } catch (error: any) {
      toast({
        title: "Failed to update password",
        description: error?.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSavingSecurity(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Client Profile</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your personal details and fitness profile
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
          <label className="text-sm font-medium">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
          />
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
            <label className="text-sm font-medium">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={handleChange}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Height (cm)</label>
            <input
              name="height"
              type="number"
              value={form.height}
              onChange={handleChange}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
              placeholder="180"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Fitness Goal</label>
            <input
              name="fitnessGoal"
              value={form.fitnessGoal}
              onChange={handleChange}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
              placeholder="Build muscle, lose fat, improve endurance"
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

      <div className="rounded-lg border bg-card p-5 card-shadow space-y-4">
        <h2 className="text-lg font-semibold">Change Password</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="password"
            name="currentPassword"
            value={security.currentPassword}
            onChange={handleSecurityChange}
            placeholder="Current password"
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
          />
          <input
            type="password"
            name="newPassword"
            value={security.newPassword}
            onChange={handleSecurityChange}
            placeholder="New password"
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
          />
        </div>

        <button
          onClick={handlePasswordSave}
          disabled={isSavingSecurity}
          className="gradient-primary rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
        >
          {isSavingSecurity ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
}