import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import {
  getCurrentUser,
  updateCurrentUser,
  updateEmail,
  updatePassword,
  updateAvatar,
  getTrainerProfile,
  updateTrainerProfile,
} from "@/services/profileService";

export default function TrainerProfile() {
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingSecurity, setIsSavingSecurity] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    avatarUrl: "",
    bio: "",
    specializations: "",
    certifications: "",
    yearsExperience: "",
    phoneNumber: "",
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const fetchProfile = async () => {
    try {
      const [userData, trainerData] = await Promise.all([
        getCurrentUser(),
        getTrainerProfile(),
      ]);

      setForm({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        avatarUrl: userData.avatarUrl || "",
        bio: trainerData.bio || "",
        specializations: (trainerData.specializations || []).join(", "),
        certifications: (trainerData.certifications || []).join(", "),
        yearsExperience: trainerData.yearsExperience?.toString() || "",
        phoneNumber: trainerData.phoneNumber || "",
      });
    } catch (error) {
      console.error("Error fetching trainer profile:", error);
      toast({
        title: "Failed to load profile",
        description: "Could not fetch trainer profile data",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

  const parseList = (value: string) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

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
        updateTrainerProfile({
          bio: form.bio || undefined,
          specializations: parseList(form.specializations),
          certifications: parseList(form.certifications),
          yearsExperience: form.yearsExperience
            ? Number(form.yearsExperience)
            : undefined,
          phoneNumber: form.phoneNumber || undefined,
        }),
      ]);

      toast({
        title: "Profile updated",
        description: "Your trainer profile was saved successfully",
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
        <h1 className="text-2xl font-bold">Trainer Profile</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your public trainer profile and contact information
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

        <div className="space-y-2">
          <label className="text-sm font-medium">Bio</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            className="min-h-[120px] w-full rounded-lg border bg-background px-3 py-2 text-sm"
            placeholder="Tell clients about your experience and coaching style"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Specializations</label>
            <input
              name="specializations"
              value={form.specializations}
              onChange={handleChange}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
              placeholder="Strength Training, Fat Loss"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Certifications</label>
            <input
              name="certifications"
              value={form.certifications}
              onChange={handleChange}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
              placeholder="NASM CPT, ISSA"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Years of Experience</label>
            <input
              name="yearsExperience"
              type="number"
              value={form.yearsExperience}
              onChange={handleChange}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
              placeholder="5"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number</label>
            <input
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
              placeholder="+38344111222"
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