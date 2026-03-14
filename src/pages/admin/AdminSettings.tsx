import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    platformName: 'FitPro',
    supportEmail: 'support@fitpro.com',
    maxClients: '50',
    trialDays: '14',
  });

  const handleSave = () => {
    toast({ title: 'Settings saved', description: 'Platform configuration updated.' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="mt-1 text-muted-foreground">Platform configuration</p>
      </div>
      <div className="max-w-lg space-y-4 rounded-lg border bg-card p-6 card-shadow">
        {Object.entries(settings).map(([key, value]) => (
          <div key={key}>
            <label className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
            <input value={value} onChange={e => setSettings(s => ({ ...s, [key]: e.target.value }))}
              className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2" />
          </div>
        ))}
        <button onClick={handleSave} className="gradient-primary rounded-lg px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
          Save Settings
        </button>
      </div>
    </div>
  );
}
