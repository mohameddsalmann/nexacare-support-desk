import { ConversationHeader } from "./ConversationHeader";
import { MessageList } from "./MessageList";
import { QuickActions } from "./QuickActions";
import { MessageComposer } from "./MessageComposer";
import type { Message } from "@/types/conversation";

export function ChatShell({
  conversationId,
  messages,
  typing,
  onSend,
  onRetry,
}: {
  conversationId: string;
  messages: Message[];
  typing: boolean;
  onSend: (text: string) => void;
  onRetry: (m: Message) => void;
}) {
  const showQuickActions = messages.filter((m) => m.role === "customer").length === 0;

  return (
    <div className="flex flex-col">
      <h2 className="tp-eyebrow mb-3">Customer conversation</h2>
      <div className="tp-card flex h-[clamp(28rem,64vh,40rem)] flex-col overflow-hidden">
        <ConversationHeader conversationId={conversationId} />
        <MessageList messages={messages} typing={typing} onRetry={onRetry} />
        {showQuickActions && (
          <div className="border-t border-line px-4 py-3 sm:px-6">
            <QuickActions onSelect={onSend} disabled={typing} />
          </div>
        )}
      </div>
      <div className="mt-3">
        <MessageComposer onSend={onSend} disabled={typing} />
      </div>
    </div>
  );
}
