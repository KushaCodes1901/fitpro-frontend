import API from "@/lib/api";

export const getNotifications = async () => {
  const res = await API.get("/notifications");
  return res.data;
};

export const markNotificationRead = async (id: string) => {
  const res = await API.put(`/notifications/${id}/read`);
  return res.data;
};

export const markAllNotificationsRead = async () => {
  const res = await API.put("/notifications/read-all");
  return res.data;
};