import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Camera } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function ClientProfile() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 987-6543',
    height: '178 cm',
    weight: '82 kg',
    goalWeight: '78 kg',
  });

  const handleSave = () => toast({ title: 'Profile updated' });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="mt-1 text-muted-foreground">Your personal information</p>
      </div>

      <div className="max-w-lg space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
              {form.name.charAt(0)}
            </div>
            <button className="absolute -bottom-1 -right-1 rounded-full bg-card border p-1.5 shadow-sm hover:bg-muted">
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
          <div>
            <p className="font-semibold">{form.name}</p>
            <p className="text-sm text-muted-foreground capitalize">{user?.role}</p>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 card-shadow space-y-4">
          {Object.entries(form).map(([key, value]) => (
            <div key={key}>
              <label className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
              <input value={value} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2" />
            </div>
          ))}
          <button onClick={handleSave} className="gradient-primary rounded-lg px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
