import { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import type { Message } from "@/types/conversation";

export function MessageList({
  messages,
  typing,
  onRetry,
}: {
  messages: Message[];
  typing: boolean;
  onRetry: (m: Message) => void;
}) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [messages, typing]);

  return (
    <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5 sm:px-6">
      {messages.map((m) => (
        <MessageBubble key={m.id} message={m} onRetry={onRetry} />
      ))}
      {typing && <TypingIndicator />}
      <div ref={endRef} />
    </div>
  );
}
