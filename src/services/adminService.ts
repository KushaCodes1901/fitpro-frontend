import API from "@/lib/api";

export const getAdminAnalytics = async () => {
  const res = await API.get("/admin/analytics");
  return res.data;
};

export const getAdminTrainers = async () => {
  const res = await API.get("/admin/trainers");
  return res.data;
};

export const getAdminClients = async () => {
  const res = await API.get("/admin/clients");
  return res.data;
};

export const updateUserStatus = async (userId: string, isActive: boolean) => {
  const res = await API.put(`/admin/users/${userId}/status`, { isActive });
  return res.data;
};