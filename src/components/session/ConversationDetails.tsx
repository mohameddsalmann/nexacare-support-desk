import { ChevronDown } from "lucide-react";
import type { SessionState } from "@/types/conversation";

export function ConversationDetails({ session }: { session: SessionState }) {
  const rows: [string, string][] = [
    ["Rasa flow", session.flow ?? "—"],
    ["Last action", session.lastAction ?? "—"],
    ["Conversation ID", session.conversationId],
    ["Backend", session.backendConnected ? "Connected" : "Demo adapter"],
  ];

  return (
    <details className="tp-card group px-4 py-3">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2">
        <span className="tp-eyebrow">Conversation details</span>
        <ChevronDown
          strokeWidth={1.5}
          className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180"
        />
      </summary>
      <dl className="mt-3 space-y-2 border-t border-line pt-3">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-start justify-between gap-3">
            <dt className="text-xs text-muted-foreground">{k}</dt>
            <dd className="max-w-[60%] break-all text-right font-mono text-xs text-foreground">
              {v}
            </dd>
          </div>
        ))}
      </dl>
    </details>
  );
}
