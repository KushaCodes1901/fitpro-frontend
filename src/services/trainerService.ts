import API from "@/lib/api";

export const getClients = async () => {
  const res = await API.get("/trainer/clients");
  return res.data;
};

export const assignClient = async (clientEmail: string) => {
  const res = await API.post("/trainer/clients/assign", { clientEmail });
  return res.data;
};

export const getTrainerPlans = async () => {
  const res = await API.get("/trainer/plans");
  return res.data;
};

export const assignPlanToClient = async (planId: string, clientEmail: string) => {
  const res = await API.post(`/trainer/plans/${planId}/assign`, { clientEmail });
  return res.data;
};