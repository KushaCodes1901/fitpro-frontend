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