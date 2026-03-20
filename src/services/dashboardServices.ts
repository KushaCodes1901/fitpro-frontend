import { getClients, getTrainerPlans } from "@/services/trainerService";
import { getTrainerSessions, getClientSessions } from "@/services/sessionService";
import {
  getClientPlans,
  getWorkoutHistory,
  getMyProgress,
  getClientNutritionPlans,
} from "@/services/clientService";

export const getTrainerDashboardData = async () => {
  const [clients, plans, sessions] = await Promise.all([
    getClients(),
    getTrainerPlans(),
    getTrainerSessions(),
  ]);

  return {
    clients,
    plans,
    sessions,
  };
};

export const getClientDashboardData = async () => {
  const [plans, sessions, workoutHistory, progress, nutritionPlans] = await Promise.all([
    getClientPlans(),
    getClientSessions(),
    getWorkoutHistory(),
    getMyProgress(),
    getClientNutritionPlans(),
  ]);

  return {
    plans,
    sessions,
    workoutHistory,
    progress,
    nutritionPlans,
  };
};