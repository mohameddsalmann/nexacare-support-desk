import { AlertCircle, RotateCcw } from "lucide-react";
import type { Message } from "@/types/conversation";

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function MessageBubble({
  message,
  onRetry,
}: {
  message: Message;
  onRetry?: (m: Message) => void;
}) {
  const isCustomer = message.role === "customer";

  return (
    <div className={`flex gap-3 ${isCustomer ? "justify-end" : "justify-start"}`}>
      {!isCustomer && (
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-line bg-background">
          <span className="h-2 w-2 rounded-full bg-tp-pink" />
        </div>
      )}

      <div className={`max-w-[85%] sm:max-w-[78%] ${isCustomer ? "items-end" : "items-start"} flex flex-col`}>
        <div
          className={[
            "rounded-xl border px-4 py-3 text-sm leading-relaxed",
            isCustomer
              ? "border-line bg-surface text-foreground"
              : "border-line bg-background text-foreground",
            message.state === "error" ? "border-warn/60" : "",
          ].join(" ")}
        >
          {message.text}
        </div>

        <div className="mt-1.5 flex items-center gap-2 px-1 text-[11px] text-muted-foreground">
          <span>{isCustomer ? "Customer" : "Assistant"}</span>
          <span aria-hidden="true">·</span>
          <span>{formatTime(message.timestamp)}</span>
          {message.state === "sending" && <span className="italic">Sending…</span>}
          {message.state === "error" && (
            <>
              <span className="inline-flex items-center gap-1 text-warn">
                <AlertCircle strokeWidth={1.5} className="h-3.5 w-3.5" />
                Not delivered
              </span>
              {onRetry && (
                <button
                  type="button"
                  onClick={() => onRetry(message)}
                  className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 font-medium text-tp-pink hover:underline"
                >
                  <RotateCcw strokeWidth={1.5} className="h-3.5 w-3.5" />
                  Retry
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
