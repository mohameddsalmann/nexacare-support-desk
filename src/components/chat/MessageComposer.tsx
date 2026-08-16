import { useState } from "react";
import { Mic, SendHorizontal } from "lucide-react";

export function MessageComposer({
  onSend,
  disabled,
}: {
  onSend: (text: string) => void;
  disabled?: boolean;
}) {
  const [value, setValue] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = value.trim();
    if (!text || disabled) return;
    setValue("");
    onSend(text);
  };

  return (
    <form onSubmit={submit} className="flex items-end gap-2">
      <div className="flex flex-1 items-center gap-2 rounded-xl border border-line bg-background px-3 focus-within:border-tp-pink focus-within:ring-2 focus-within:ring-tp-pink/20">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type your message…"
          aria-label="Message"
          className="min-h-12 flex-1 bg-transparent py-3 text-base text-foreground outline-none placeholder:text-muted-foreground"
        />
        <button
          type="button"
          disabled
          title="Voice input — coming soon"
          aria-label="Voice input (coming soon)"
          className="flex h-11 w-11 items-center justify-center rounded-lg text-muted-foreground opacity-50"
        >
          <Mic strokeWidth={1.5} className="h-5 w-5" />
        </button>
      </div>

      <button
        type="submit"
        disabled={disabled || value.trim().length === 0}
        className="tp-lift inline-flex h-12 min-w-12 items-center justify-center gap-2 rounded-xl bg-tp-pink px-4 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span className="hidden sm:inline">Send</span>
        <SendHorizontal strokeWidth={1.5} className="h-4.5 w-4.5" />
      </button>
    </form>
  );
}
