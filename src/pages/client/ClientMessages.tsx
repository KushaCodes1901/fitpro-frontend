import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import {
  getMyMessages,
  sendMessage,
  getConversationWithUser,
} from "@/services/messageService";
import API from "@/lib/api";

export default function ClientMessages() {
  const [trainer, setTrainer] = useState<any | null>(null);
  const [conversation, setConversation] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const [isSending, setIsSending] = useState(false);

  const fetchTrainer = async () => {
    const res = await API.get("/client/trainer");
    const trainerUser = res.data;

    setTrainer({
      id: trainerUser.id,
      name: `${trainerUser.firstName || ""} ${trainerUser.lastName || ""}`.trim(),
      email: trainerUser.email,
    });
  };

  const fetchInitialData = async () => {
    try {
      await Promise.all([getMyMessages(), fetchTrainer()]);
    } catch (error) {
      console.error("Error loading client messages page:", error);
      toast({
        title: "Failed to load messages",
        description: "Could not fetch your trainer or messages",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    const loadConversation = async () => {
      if (!trainer?.id) return;

      try {
        const conversationData = await getConversationWithUser(trainer.id);
        setConversation(conversationData);
      } catch (error) {
        console.error("Error fetching conversation:", error);
      }
    };

    loadConversation();
  }, [trainer]);

  const handleSendMessage = async () => {
    if (!trainer || !content.trim()) return;

    try {
      setIsSending(true);

      await sendMessage({
        receiverEmail: trainer.email,
        content,
      });

      toast({
        title: "Message sent",
        description: `Sent to ${trainer.name}`,
      });

      setContent("");

      const conversationData = await getConversationWithUser(trainer.id);
      setConversation(conversationData);
    } catch (error: any) {
      toast({
        title: "Failed to send message",
        description: error?.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="rounded-lg border bg-card p-4 card-shadow">
      <div className="border-b pb-3">
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="mt-1 text-muted-foreground">
          {trainer
            ? `Conversation with ${trainer.name}`
            : "No trainer assigned yet"}
        </p>
      </div>

      {!trainer ? (
        <div className="py-10 text-sm text-muted-foreground">
          You do not have an assigned trainer yet.
        </div>
      ) : (
        <>
          <div className="mt-4 max-h-[420px] space-y-3 overflow-y-auto rounded-lg border p-4">
            {conversation.length === 0 ? (
              <div className="text-sm text-muted-foreground">
                No messages yet.
              </div>
            ) : (
              conversation.map((message) => {
                const isMine = message.sender?.email !== trainer.email;

                return (
                  <div
                    key={message.id}
                    className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${
                        isMine
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <div>{message.content}</div>
                      <div
                        className={`mt-1 text-xs ${
                          isMine
                            ? "text-primary-foreground/80"
                            : "text-muted-foreground"
                        }`}
                      >
                        {new Date(message.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="mt-4 space-y-3">
            <textarea
              placeholder="Type your message..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px] w-full rounded-lg border bg-background px-3 py-2 text-sm"
            />

            <button
              onClick={handleSendMessage}
              disabled={isSending}
              className="gradient-primary rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
            >
              {isSending ? "Sending..." : "Send Message"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}