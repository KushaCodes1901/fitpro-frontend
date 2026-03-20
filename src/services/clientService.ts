import API from "@/lib/api";

export const getClientPlans = async () => {
  const res = await API.get("/client/plans");
  return res.data;
};

export const logWorkout = async (payload: {
  assignmentId: string;
  workoutDayId: string;
  notes?: string;
  difficultyRating?: number;
}) => {
  const res = await API.post("/client/workouts/log", payload);
  return res.data;
};

export const getWorkoutHistory = async () => {
  const res = await API.get("/client/workouts/history");
  return res.data;
};

export const getClientNutritionPlans = async () => {
  const res = await API.get("/nutrition/client");
  return res.data;
};

export const getMyProgress = async () => {
  const res = await API.get("/client/progress");
  return res.data;
};

export const logBodyMeasurement = async (payload: {
  weight?: number;
  bodyFat?: number;
  chest?: number;
  waist?: number;
  hips?: number;
  leftArm?: number;
  rightArm?: number;
  leftThigh?: number;
  rightThigh?: number;
  notes?: string;
}) => {
  const res = await API.post("/client/progress", payload);
  return res.data;
};