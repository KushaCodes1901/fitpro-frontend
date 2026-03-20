import API from "@/lib/api";

export const getCurrentUser = async () => {
  const res = await API.get("/users/me");
  return res.data;
};

export const updateCurrentUser = async (payload: {
  firstName?: string;
  lastName?: string;
}) => {
  const res = await API.put("/users/me", payload);
  return res.data;
};

export const updateAvatar = async (avatarUrl: string) => {
  const res = await API.put("/users/me/avatar", { avatarUrl });
  return res.data;
};

export const getTrainerProfile = async () => {
  const res = await API.get("/trainer/profile");
  return res.data;
};

export const updateTrainerProfile = async (payload: {
  bio?: string;
  specializations?: string[];
  certifications?: string[];
  yearsExperience?: number;
  phoneNumber?: string;
}) => {
  const res = await API.put("/trainer/profile", payload);
  return res.data;
};

export const getClientProfile = async () => {
  const res = await API.get("/users/me");
  return res.data;
};

export const updateClientProfile = async (payload: {
  dateOfBirth?: string;
  gender?: string;
  height?: number;
  fitnessGoal?: string;
}) => {
  const res = await API.put("/users/me/client-profile", payload);
  return res.data;
};