import API from "@/lib/api";

export const getClients = async () => {
  const res = await API.get("/trainer/clients");
  return res.data;
};

export const assignClient = async (clientEmail: string) => {
  const res = await API.post("/trainer/clients/assign", { clientEmail });
  return res.data;
};