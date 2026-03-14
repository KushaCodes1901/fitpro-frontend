import { useState } from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

const conversations = [
  { id: '1', name: 'Mike Chen', lastMsg: 'See you at 10!', time: '2m ago', unread: true },
  { id: '2', name: 'Amy Liu', lastMsg: 'Thanks for the plan', time: '1h ago', unread: false },
  { id: '3', name: 'Carlos Ruiz', lastMsg: 'Can we reschedule?', time: '3h ago', unread: true },
];

const chatMessages = [
  { id: '1', sender: 'client', content: 'Hi! I completed today\'s workout', time: '10:30 AM' },
  { id: '2', sender: 'trainer', content: 'Great work! How did you feel?', time: '10:32 AM' },
  { id: '3', sender: 'client', content: 'Felt strong. Increased weight on squats.', time: '10:35 AM' },
  { id: '4', sender: 'trainer', content: 'That\'s awesome progress! Keep it up 💪', time: '10:36 AM' },
  { id: '5', sender: 'client', content: 'See you at 10!', time: '10:40 AM' },
];

export default function TrainerMessages() {
  const [activeChat, setActiveChat] = useState('1');
  const [newMsg, setNewMsg] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="mt-1 text-muted-foreground">Chat with your clients</p>
      </div>

      <div className="flex h-[500px] overflow-hidden rounded-lg border bg-card card-shadow">
        {/* Sidebar */}
        <div className="w-64 border-r overflow-y-auto hidden sm:block">
          {conversations.map(c => (
            <button key={c.id} onClick={() => setActiveChat(c.id)}
              className={cn("w-full p-4 text-left border-b transition-colors hover:bg-muted/50", activeChat === c.id && "bg-muted")}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{c.name}</span>
                <span className="text-[10px] text-muted-foreground">{c.time}</span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground truncate">{c.lastMsg}</p>
              {c.unread && <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary" />}
            </button>
          ))}
        </div>

        {/* Chat */}
        <div className="flex flex-1 flex-col">
          <div className="border-b px-4 py-3">
            <p className="font-semibold text-sm">{conversations.find(c => c.id === activeChat)?.name}</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map(m => (
              <div key={m.id} className={cn("flex", m.sender === 'trainer' ? 'justify-end' : 'justify-start')}>
                <div className={cn("max-w-[70%] rounded-lg px-3 py-2 text-sm", m.sender === 'trainer' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                  <p>{m.content}</p>
                  <p className={cn("mt-1 text-[10px]", m.sender === 'trainer' ? 'text-primary-foreground/70' : 'text-muted-foreground')}>{m.time}</p>
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
    </div>
  );
}
