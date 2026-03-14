import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard, Users, Dumbbell, Apple, Calendar, MessageSquare, UserCircle,
  Settings, Megaphone, Menu, X, LogOut, Bell, ChevronDown, TrendingUp, ClipboardList
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const navByRole: Record<string, NavItem[]> = {
  admin: [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
    { label: 'Trainers', path: '/admin/trainers', icon: <Users className="h-4 w-4" /> },
    { label: 'Clients', path: '/admin/clients', icon: <Users className="h-4 w-4" /> },
    { label: 'Announcements', path: '/admin/announcements', icon: <Megaphone className="h-4 w-4" /> },
    { label: 'Settings', path: '/admin/settings', icon: <Settings className="h-4 w-4" /> },
  ],
  trainer: [
    { label: 'Dashboard', path: '/trainer/dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
    { label: 'Clients', path: '/trainer/clients', icon: <Users className="h-4 w-4" /> },
    { label: 'Workout Plans', path: '/trainer/plans', icon: <Dumbbell className="h-4 w-4" /> },
    { label: 'Nutrition', path: '/trainer/nutrition', icon: <Apple className="h-4 w-4" /> },
    { label: 'Schedule', path: '/trainer/schedule', icon: <Calendar className="h-4 w-4" /> },
    { label: 'Messages', path: '/trainer/messages', icon: <MessageSquare className="h-4 w-4" /> },
    { label: 'Profile', path: '/trainer/profile', icon: <UserCircle className="h-4 w-4" /> },
  ],
  client: [
    { label: 'Dashboard', path: '/client/dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
    { label: 'Workouts', path: '/client/workouts', icon: <Dumbbell className="h-4 w-4" /> },
    { label: 'Nutrition', path: '/client/nutrition', icon: <Apple className="h-4 w-4" /> },
    { label: 'Progress', path: '/client/progress', icon: <TrendingUp className="h-4 w-4" /> },
    { label: 'Schedule', path: '/client/schedule', icon: <Calendar className="h-4 w-4" /> },
    { label: 'Messages', path: '/client/messages', icon: <MessageSquare className="h-4 w-4" /> },
    { label: 'Profile', path: '/client/profile', icon: <UserCircle className="h-4 w-4" /> },
  ],
};

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  if (!user) return null;
  const navItems = navByRole[user.role] || [];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-60 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:static lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
          <Dumbbell className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold tracking-tight">FitPro</span>
          <button className="ml-auto lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5 text-sidebar-muted" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-sidebar-border p-4">
          <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-muted transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-card px-4 lg:px-8">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5 text-foreground" />
          </button>
          <div className="flex-1" />
          <button className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
          </button>
          <div className="relative">
            <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-muted">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                {user.name.charAt(0)}
              </div>
              <span className="hidden font-medium sm:inline">{user.name}</span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
            {userMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-lg border bg-card py-1 shadow-lg">
                  <div className="border-b px-4 py-2">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <Link to={`/${user.role}/profile`} onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted">
                    <UserCircle className="h-4 w-4" /> Profile
                  </Link>
                  <button onClick={handleLogout} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-muted">
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
