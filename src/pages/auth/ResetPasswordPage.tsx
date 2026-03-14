import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Dumbbell } from 'lucide-react';

export default function ResetPasswordPage() {
  const { token } = useParams();
  const { resetPassword } = useAuth();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { setError('Passwords do not match'); return; }
    setLoading(true);
    await resetPassword(token || '', password);
    setDone(true);
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2 text-xl font-bold">
          <Dumbbell className="h-7 w-7 text-primary" /> FitPro
        </Link>
        <div className="rounded-lg border bg-card p-8 card-shadow">
          <h1 className="text-xl font-bold">Reset password</h1>
          {done ? (
            <div className="mt-4">
              <p className="rounded-lg bg-success/10 p-4 text-sm text-success">Password reset successfully!</p>
              <Link to="/login" className="mt-4 block text-center text-sm font-medium text-primary hover:underline">Go to login</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {error && <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
              <div>
                <label className="text-sm font-medium">New Password</label>
                <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                  className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2" />
              </div>
              <div>
                <label className="text-sm font-medium">Confirm Password</label>
                <input type="password" required value={confirm} onChange={e => setConfirm(e.target.value)}
                  className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full gradient-primary rounded-lg py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50">
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
