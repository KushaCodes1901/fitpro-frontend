import API from "@/lib/api";

export const getTrainerSessions = async () => {
  const res = await API.get("/sessions/trainer");
  return res.data;
};

export const createTrainerSession = async (payload: {
  clientEmail: string;
  scheduledAt: string;
  durationMin?: number;
  type?: "ONLINE" | "IN_PERSON";
  notes?: string;
}) => {
  const res = await API.post("/sessions/trainer", payload);
  return res.data;
};

export const getClientSessions = async () => {
  const res = await API.get("/sessions/client");
  return res.data;
};