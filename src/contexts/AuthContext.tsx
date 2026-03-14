import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, UserRole, LoginCredentials, RegisterData } from '@/types';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for frontend demo
const DEMO_USERS: Record<string, User> = {
  'admin@fitpro.com': { id: '1', name: 'Admin User', email: 'admin@fitpro.com', role: 'admin', createdAt: '2024-01-01' },
  'trainer@fitpro.com': { id: '2', name: 'Sarah Johnson', email: 'trainer@fitpro.com', role: 'trainer', avatar: '', createdAt: '2024-01-15' },
  'client@fitpro.com': { id: '3', name: 'Mike Chen', email: 'client@fitpro.com', role: 'client', avatar: '', createdAt: '2024-02-01' },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('fitpro_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { /* ignore */ }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 800));
    const demoUser = DEMO_USERS[credentials.email];
    if (demoUser && credentials.password === 'password') {
      setUser(demoUser);
      localStorage.setItem('fitpro_user', JSON.stringify(demoUser));
      localStorage.setItem('fitpro_token', 'demo-token');
      toast({ title: 'Welcome back!', description: `Logged in as ${demoUser.name}` });
    } else {
      setIsLoading(false);
      throw new Error('Invalid credentials. Try admin@fitpro.com / password');
    }
    setIsLoading(false);
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const newUser: User = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      role: data.role,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    localStorage.setItem('fitpro_user', JSON.stringify(newUser));
    localStorage.setItem('fitpro_token', 'demo-token');
    toast({ title: 'Account created!', description: 'Welcome to FitPro' });
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('fitpro_user');
    localStorage.removeItem('fitpro_token');
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    await new Promise(r => setTimeout(r, 800));
    toast({ title: 'Email sent', description: 'Check your inbox for reset instructions' });
  }, []);

  const resetPassword = useCallback(async (_token: string, _password: string) => {
    await new Promise(r => setTimeout(r, 800));
    toast({ title: 'Password reset', description: 'You can now login with your new password' });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout, forgotPassword, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

export function getRoleDashboardPath(role: UserRole): string {
  switch (role) {
    case 'admin': return '/admin/dashboard';
    case 'trainer': return '/trainer/dashboard';
    case 'client': return '/client/dashboard';
  }
}
