import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import { DashboardLayout } from "@/components/shared/DashboardLayout";

import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";

import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminTrainers from "@/pages/admin/AdminTrainers";
import AdminClients from "@/pages/admin/AdminClients";
import AdminSettings from "@/pages/admin/AdminSettings";
import AdminAnnouncements from "@/pages/admin/AdminAnnouncements";
import AdminProfile from "@/pages/admin/AdminProfile";

import TrainerDashboard from "@/pages/trainer/TrainerDashboard";
import TrainerClients from "@/pages/trainer/TrainerClients";
import TrainerPlans from "@/pages/trainer/TrainerPlans";
import TrainerNutrition from "@/pages/trainer/TrainerNutrition";
import TrainerSchedule from "@/pages/trainer/TrainerSchedule";
import TrainerMessages from "@/pages/trainer/TrainerMessages";
import TrainerProfile from "@/pages/trainer/TrainerProfile";

import ClientDashboard from "@/pages/client/ClientDashboard";
import ClientWorkouts from "@/pages/client/ClientWorkouts";
import ClientNutrition from "@/pages/client/ClientNutrition";
import ClientProgress from "@/pages/client/ClientProgress";
import ClientSchedule from "@/pages/client/ClientSchedule";
import ClientMessages from "@/pages/client/ClientMessages";
import ClientProfile from "@/pages/client/ClientProfile";

import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="trainers" element={<AdminTrainers />} />
              <Route path="clients" element={<AdminClients />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="announcements" element={<AdminAnnouncements />} />
              <Route path="profile" element={<AdminProfile />} />
            </Route>

            <Route
              path="/trainer"
              element={
                <ProtectedRoute allowedRoles={["trainer"]}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<TrainerDashboard />} />
              <Route path="clients" element={<TrainerClients />} />
              <Route path="plans" element={<TrainerPlans />} />
              <Route path="nutrition" element={<TrainerNutrition />} />
              <Route path="schedule" element={<TrainerSchedule />} />
              <Route path="messages" element={<TrainerMessages />} />
              <Route path="profile" element={<TrainerProfile />} />
            </Route>

            <Route
              path="/client"
              element={
                <ProtectedRoute allowedRoles={["client"]}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<ClientDashboard />} />
              <Route path="workouts" element={<ClientWorkouts />} />
              <Route path="nutrition" element={<ClientNutrition />} />
              <Route path="progress" element={<ClientProgress />} />
              <Route path="schedule" element={<ClientSchedule />} />
              <Route path="messages" element={<ClientMessages />} />
              <Route path="profile" element={<ClientProfile />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;