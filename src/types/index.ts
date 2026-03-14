export type UserRole = 'admin' | 'trainer' | 'client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'trainer' | 'client';
}

export interface StatCard {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  days: WorkoutDay[];
  assignedTo?: string[];
  createdAt: string;
}

export interface WorkoutDay {
  day: string;
  exercises: Exercise[];
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
  notes?: string;
}

export interface NutritionPlan {
  id: string;
  name: string;
  meals: Meal[];
  assignedTo?: string[];
}

export interface Meal {
  id: string;
  name: string;
  time: string;
  foods: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Session {
  id: string;
  trainerId: string;
  clientId: string;
  date: string;
  time: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: string;
}
