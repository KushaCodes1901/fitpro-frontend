import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, getRoleDashboardPath } from '@/contexts/AuthContext';
import { Dumbbell } from 'lucide-react';

export default function RegisterPage() {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'client' as 'trainer' | 'client' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    try {
      await register(form);
      navigate(getRoleDashboardPath(form.role));
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2 text-xl font-bold">
          <Dumbbell className="h-7 w-7 text-primary" /> FitPro
        </Link>
        <div className="rounded-lg border bg-card p-8 card-shadow">
          <h1 className="text-xl font-bold">Create your account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Start your fitness journey</p>

          {error && <p className="mt-4 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium">I am a</label>
              <div className="mt-1 flex gap-2">
                {(['trainer', 'client'] as const).map(r => (
                  <button key={r} type="button" onClick={() => setForm(f => ({ ...f, role: r }))}
                    className={`flex-1 rounded-lg border py-2.5 text-sm font-medium capitalize transition-colors ${form.role === r ? 'border-primary bg-primary/10 text-primary' : 'hover:bg-muted'}`}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2" />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2" />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <input type="password" required value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2" />
            </div>
            <div>
              <label className="text-sm font-medium">Confirm Password</label>
              <input type="password" required value={form.confirmPassword} onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
                className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2" />
            </div>
            <button type="submit" disabled={isLoading}
              className="w-full gradient-primary rounded-lg py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50">
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
