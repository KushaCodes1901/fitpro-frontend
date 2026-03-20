import { useEffect, useState } from 'react';
import { Plus, Megaphone } from 'lucide-react';
import { EmptyState } from '@/components/shared/EmptyState';
import { toast } from '@/hooks/use-toast';
import {
  getAnnouncements,
  createAnnouncement,
} from '@/services/announcementService';

interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const fetchAnnouncements = async () => {
    try {
      const data = await getAnnouncements();
      setAnnouncements(data || []);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      toast({
        title: 'Failed to load announcements',
        description: 'Could not fetch announcements',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleCreate = async () => {
    if (!title.trim() || !content.trim()) return;

    try {
      setIsCreating(true);

      await createAnnouncement({ title, content });

      toast({ title: 'Announcement created' });

      setTitle('');
      setContent('');
      setShowForm(false);

      await fetchAnnouncements();
    } catch (error: any) {
      toast({
        title: 'Create failed',
        description: error?.response?.data?.message || 'Could not create announcement',
        variant: 'destructive',
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Announcements</h1>
          <p className="mt-1 text-muted-foreground">Create and manage platform announcements</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="gradient-primary flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> New
        </button>
      </div>

      {showForm && (
        <div className="rounded-lg border bg-card p-6 card-shadow space-y-4">
          <input
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
          />
          <textarea
            placeholder="Content"
            rows={3}
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
          />
          <div className="flex gap-2">
            <button
              onClick={handleCreate}
              disabled={isCreating}
              className="gradient-primary rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
            >
              {isCreating ? "Creating..." : "Create"}
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="rounded-lg border px-4 py-2 text-sm hover:bg-muted"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {announcements.length === 0 ? (
        <EmptyState
          icon={<Megaphone className="h-8 w-8" />}
          title="No announcements"
          description="Create your first announcement."
        />
      ) : (
        <div className="space-y-3">
          {announcements.map((a) => (
            <div key={a.id} className="rounded-lg border bg-card p-5 card-shadow">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{a.title}</h3>
                <span className="text-xs text-muted-foreground">
                  {new Date(a.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{a.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}