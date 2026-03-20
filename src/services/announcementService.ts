import API from "@/lib/api";

export const getAnnouncements = async () => {
  const res = await API.get("/announcements");
  return res.data;
};

export const createAnnouncement = async (payload: {
  title: string;
  content: string;
}) => {
  const res = await API.post("/announcements", payload);
  return res.data;
};