import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { getClients } from "@/services/trainerService";
import {
  getMyMessages,
  sendMessage,
  getConversationWithUser,
} from "@/services/messageService";

export default function TrainerMessages() {
  const [clients, setClients] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [conversation, setConversation] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<any | null>(null);
  const [content, setContent] = useState("");
  const [isSending, setIsSending] = useState(false);

  const fetchInitialData = async () => {
    try {
      const [clientsData, messagesData] = await Promise.all([
        getClients(),
        getMyMessages(),
      ]);

      const mappedClients = clientsData.map((client: any) => ({
        id: client.id,
        userId: client.user?.id,
        name: `${client.user?.firstName || ""} ${client.user?.lastName || ""}`.trim(),
        email: client.user?.email || "",
      }));

      setClients(mappedClients);
      setMessages(messagesData);
    } catch (error) {
      console.error("Error loading trainer messages page:", error);
      toast({
        title: "Failed to load messages",
        description: "Could not fetch clients or messages",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleSelectClient = async (client: any) => {
    try {
      setSelectedClient(client);
      const conversationData = await getConversationWithUser(client.userId);
      setConversation(conversationData);
    } catch (error) {
      console.error("Error fetching conversation:", error);
      toast({
        title: "Failed to load conversation",
        description: "Could not fetch messages for this client",
        variant: "destructive",
      });
    }
  };

  const handleSendMessage = async () => {
    if (!selectedClient || !content.trim()) return;

    try {
      setIsSending(true);

      await sendMessage({
        receiverEmail: selectedClient.email,
        content,
      });

      toast({
        title: "Message sent",
        description: `Sent to ${selectedClient.name}`,
      });

      setContent("");

      const conversationData = await getConversationWithUser(selectedClient.userId);
      setConversation(conversationData);

      const messagesData = await getMyMessages();
      setMessages(messagesData);
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
    <div className="grid gap-6 lg:grid-cols-[320px,1fr]">
      <div className="rounded-lg border bg-card p-4 card-shadow">
        <h2 className="text-lg font-semibold">My Clients</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Select a client to open the conversation
        </p>

        <div className="mt-4 space-y-2">
          {clients.length === 0 ? (
            <div className="text-sm text-muted-foreground">
              No assigned clients yet.
            </div>
          ) : (
            clients.map((client) => (
              <button
                key={client.id}
                onClick={() => handleSelectClient(client)}
                className={`w-full rounded-lg border p-3 text-left transition hover:bg-muted ${
                  selectedClient?.id === client.id ? "border-primary bg-muted" : ""
                }`}
              >
                <div className="font-medium">{client.name}</div>
                <div className="text-sm text-muted-foreground">{client.email}</div>
              </button>
            ))
          )}
        </div>
      </div>

      <div className="rounded-lg border bg-card p-4 card-shadow">
        <div className="border-b pb-3">
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="mt-1 text-muted-foreground">
            {selectedClient
              ? `Conversation with ${selectedClient.name}`
              : "Select a client to start messaging"}
          </p>
        </div>

        {!selectedClient ? (
          <div className="py-10 text-sm text-muted-foreground">
            No conversation selected.
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
                  const isMine = message.sender?.email !== selectedClient.email;

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
    </div>
  );
}