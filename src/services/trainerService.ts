import axios from "axios";

const API = "http://localhost:5000/api/v1";

export const getClients = async (token: string) => {
  const res = await axios.get(`${API}/trainer/clients`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};