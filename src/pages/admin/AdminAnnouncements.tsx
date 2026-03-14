import { useState } from 'react';
import { Plus, Megaphone } from 'lucide-react';
import { EmptyState } from '@/components/shared/EmptyState';
import { toast } from '@/hooks/use-toast';

interface Announcement { id: string; title: string; content: string; createdAt: string; }

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    { id: '1', title: 'Platform Maintenance', content: 'Scheduled maintenance on March 20th from 2-4 AM EST.', createdAt: '2026-03-10' },
    { id: '2', title: 'New Feature: Progress Charts', content: 'Clients can now track body measurements with visual charts.', createdAt: '2026-03-05' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreate = () => {
    if (!title.trim() || !content.trim()) return;
    setAnnouncements(prev => [{ id: crypto.randomUUID(), title, content, createdAt: new Date().toISOString().slice(0, 10) }, ...prev]);
    setTitle(''); setContent(''); setShowForm(false);
    toast({ title: 'Announcement created' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Announcements</h1>
          <p className="mt-1 text-muted-foreground">Create and manage platform announcements</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="gradient-primary flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
          <Plus className="h-4 w-4" /> New
        </button>
      </div>

      {showForm && (
        <div className="rounded-lg border bg-card p-6 card-shadow space-y-4">
          <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}
            className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2" />
          <textarea placeholder="Content" rows={3} value={content} onChange={e => setContent(e.target.value)}
            className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2" />
          <div className="flex gap-2">
            <button onClick={handleCreate} className="gradient-primary rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground">Create</button>
            <button onClick={() => setShowForm(false)} className="rounded-lg border px-4 py-2 text-sm hover:bg-muted">Cancel</button>
          </div>
        </div>
      )}

      {announcements.length === 0 ? (
        <EmptyState icon={<Megaphone className="h-8 w-8" />} title="No announcements" description="Create your first announcement." />
      ) : (
        <div className="space-y-3">
          {announcements.map(a => (
            <div key={a.id} className="rounded-lg border bg-card p-5 card-shadow">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{a.title}</h3>
                <span className="text-xs text-muted-foreground">{a.createdAt}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{a.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
