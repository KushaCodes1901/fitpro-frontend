import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import API from "@/lib/api";
import { toast } from "@/hooks/use-toast";

type UserRole = "admin" | "trainer" | "client";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function normalizeRole(role: string): UserRole {
  const value = role.toLowerCase();

  if (value === "admin" || value === "trainer" || value === "client") {
    return value;
  }

  return "client";
}

function mapBackendUser(user: any): User {
  return {
    id: user.id,
    name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
    email: user.email,
    role: normalizeRole(user.role),
    avatar: user.avatarUrl || "",
    createdAt: user.createdAt,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("fitpro_user");
    localStorage.removeItem("fitpro_token");
  }, []);

  const refreshUser = useCallback(async () => {
    const token = localStorage.getItem("fitpro_token");

    if (!token) {
      setUser(null);
      return;
    }

    try {
      const response = await API.get("/users/me");
      const mappedUser = mapBackendUser(response.data);

      setUser(mappedUser);
      localStorage.setItem("fitpro_user", JSON.stringify(mappedUser));
    } catch {
      logout();
    }
  }, [logout]);

  useEffect(() => {
    const storedUser = localStorage.getItem("fitpro_user");
    const storedToken = localStorage.getItem("fitpro_token");

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("fitpro_user");
        localStorage.removeItem("fitpro_token");
      }
    }

    refreshUser().finally(() => {
      setIsLoading(false);
    });
  }, [refreshUser]);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);

    try {
      const response = await API.post("/auth/login", credentials);
      const { user: backendUser, accessToken } = response.data;

      const mappedUser = mapBackendUser(backendUser);

      setUser(mappedUser);
      localStorage.setItem("fitpro_user", JSON.stringify(mappedUser));
      localStorage.setItem("fitpro_token", accessToken);

      toast({
        title: "Welcome back!",
        description: `Logged in as ${mappedUser.name}`,
      });
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Invalid credentials";

      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true);

    try {
      const [firstName, ...rest] = data.name.trim().split(" ");
      const lastName = rest.join(" ") || "User";

      const payload = {
        email: data.email,
        password: data.password,
        firstName,
        lastName,
        role: data.role.toUpperCase(),
      };

      const response = await API.post("/auth/register", payload);
      const { user: backendUser, accessToken } = response.data;

      const mappedUser = mapBackendUser(backendUser);

      setUser(mappedUser);
      localStorage.setItem("fitpro_user", JSON.stringify(mappedUser));
      localStorage.setItem("fitpro_token", accessToken);

      toast({
        title: "Account created!",
        description: "Welcome to FitPro",
      });
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Registration failed";

      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    try {
      await API.post("/auth/forgot-password", { email });

      toast({
        title: "Reset link requested",
        description: "Check the response for the reset token in development.",
      });
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Forgot password failed";

      throw new Error(message);
    }
  }, []);

  const resetPassword = useCallback(async (token: string, password: string) => {
    try {
      await API.post("/auth/reset-password", {
        token,
        newPassword: password,
      });

      toast({
        title: "Password reset",
        description: "You can now log in with your new password",
      });
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Reset password failed";

      throw new Error(message);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}

export function getRoleDashboardPath(role: UserRole): string {
  switch (role) {
    case "admin":
      return "/admin/dashboard";
    case "trainer":
      return "/trainer/dashboard";
    case "client":
      return "/client/dashboard";
    default:
      return "/";
  }
}