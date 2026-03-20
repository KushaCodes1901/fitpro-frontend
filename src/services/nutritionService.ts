import API from "@/lib/api";

export const getTrainerNutritionPlans = async () => {
  const res = await API.get("/nutrition/trainer");
  return res.data;
};

export const createNutritionPlan = async (payload: {
  name: string;
  description?: string;
  dailyCalories?: number;
  proteinGrams?: number;
  carbsGrams?: number;
  fatGrams?: number;
  meals?: {
    name: string;
    description?: string;
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
    sortOrder?: number;
  }[];
}) => {
  const res = await API.post("/nutrition/trainer", payload);
  return res.data;
};

export const assignNutritionPlanToClient = async (
  planId: string,
  clientEmail: string
) => {
  const res = await API.post(`/nutrition/trainer/${planId}/assign`, {
    clientEmail,
  });
  return res.data;
};