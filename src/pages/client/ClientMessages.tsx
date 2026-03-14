import { useState } from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

const messages = [
  { id: '1', sender: 'trainer', content: 'Hey Mike! How\'s the new plan going?', time: '9:00 AM' },
  { id: '2', sender: 'client', content: 'Great! Loving the new leg day routine', time: '9:05 AM' },
  { id: '3', sender: 'trainer', content: 'Awesome! Remember to track your weights', time: '9:07 AM' },
  { id: '4', sender: 'client', content: 'Will do! See you tomorrow 💪', time: '9:10 AM' },
];

export default function ClientMessages() {
  const [newMsg, setNewMsg] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="mt-1 text-muted-foreground">Chat with your trainer</p>
      </div>

      <div className="flex h-[500px] flex-col overflow-hidden rounded-lg border bg-card card-shadow">
        <div className="border-b px-4 py-3">
          <p className="font-semibold text-sm">Sarah Johnson</p>
          <p className="text-xs text-muted-foreground">Your Trainer</p>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map(m => (
            <div key={m.id} className={cn("flex", m.sender === 'client' ? 'justify-end' : 'justify-start')}>
              <div className={cn("max-w-[70%] rounded-lg px-3 py-2 text-sm", m.sender === 'client' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                <p>{m.content}</p>
                <p className={cn("mt-1 text-[10px]", m.sender === 'client' ? 'text-primary-foreground/70' : 'text-muted-foreground')}>{m.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t p-3 flex gap-2">
          <input value={newMsg} onChange={e => setNewMsg(e.target.value)} placeholder="Type a message..."
            className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2" />
          <button className="gradient-primary rounded-lg p-2.5 text-primary-foreground"><Send className="h-4 w-4" /></button>
        </div>
      </div>
    </div>
  );
}
