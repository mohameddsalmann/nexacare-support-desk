import { useCallback, useState } from "react";
import { sendMessage, isMockBackend } from "@/services/chatApi";
import { DEMO_CONVERSATION_ID } from "@/config";
import type { Message, SessionState } from "@/types/conversation";

const initialSession: SessionState = {
  conversationId: DEMO_CONVERSATION_ID,
  flow: null,
  flowStatus: "active",
  resolution: "in_progress",
  slots: {},
  handoff: { required: false },
  lastAction: null,
  backendConnected: !isMockBackend,
  customer: { id: "CUST-1001", service: "Fiber 300", region: "Athens" },
};

const uid = () => Math.random().toString(36).slice(2, 10);

const initialMessages: Message[] = [
  {
    id: "welcome",
    role: "assistant",
    text: "Hello, I'm your AI support assistant. How can I help you today?",
    timestamp: new Date().toISOString(),
    state: "sent",
  },
];

export function useConversation() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [session, setSession] = useState<SessionState>(initialSession);
  const [typing, setTyping] = useState(false);

  const deliver = useCallback(async (id: string, text: string) => {
    setTyping(true);
    try {
      const res = await sendMessage({
        conversation_id: initialSession.conversationId,
        message: text,
      });

      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, state: "sent" } : m)),
      );
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: "assistant",
          text: res.message,
          timestamp: new Date().toISOString(),
          state: "sent",
        },
      ]);
      setSession((prev) => ({
        ...prev,
        conversationId: res.conversation_id || prev.conversationId,
        flow: res.flow ?? prev.flow,
        flowStatus: res.status ?? prev.flowStatus,
        resolution: res.resolution ?? prev.resolution,
        slots: res.slots ?? prev.slots,
        handoff: res.handoff ?? prev.handoff,
        lastAction: res.last_action ?? prev.lastAction,
      }));
    } catch {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, state: "error" } : m)),
      );
    } finally {
      setTyping(false);
    }
  }, []);

  const send = useCallback(
    (text: string) => {
      const id = uid();
      setMessages((prev) => [
        ...prev,
        { id, role: "customer", text, timestamp: new Date().toISOString(), state: "sending" },
      ]);
      void deliver(id, text);
    },
    [deliver],
  );

  const retry = useCallback(
    (m: Message) => {
      setMessages((prev) =>
        prev.map((x) => (x.id === m.id ? { ...x, state: "sending" } : x)),
      );
      void deliver(m.id, m.text);
    },
    [deliver],
  );

  return { messages, session, typing, send, retry };
}
