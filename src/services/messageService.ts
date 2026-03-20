import API from "@/lib/api";

export const getMyMessages = async () => {
  const res = await API.get("/messages");
  return res.data;
};

export const sendMessage = async (payload: {
  receiverEmail: string;
  content: string;
}) => {
  const res = await API.post("/messages", payload);
  return res.data;
};

export const getConversationWithUser = async (userId: string) => {
  const res = await API.get(`/messages/${userId}`);
  return res.data;
};