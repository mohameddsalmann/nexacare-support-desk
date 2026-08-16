import { MessageSquare } from "lucide-react";

export function ConversationHeader({ conversationId }: { conversationId: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-4 sm:px-6">
      <div className="flex items-center gap-3">
        <MessageSquare strokeWidth={1.5} className="h-5 w-5 text-tp-pink" />
        <div>
          <h2 className="text-sm font-semibold text-foreground">AI support assistant</h2>
          <p className="text-xs text-muted-foreground">Typically replies instantly</p>
        </div>
      </div>
      <span className="hidden font-mono text-[11px] text-muted-foreground sm:inline">
        {conversationId}
      </span>
    </div>
  );
}
