export function TypingIndicator() {
  return (
    <div className="flex gap-3" aria-live="polite" aria-label="Assistant is typing">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-line bg-background">
        <span className="h-2 w-2 rounded-full bg-tp-pink" />
      </div>
      <div className="flex items-center gap-1.5 rounded-xl border border-line bg-background px-4 py-3.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground"
            style={{ animationDelay: `${i * 160}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
