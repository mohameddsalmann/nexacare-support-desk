import { SessionCard } from "./SessionCard";

export function CollectedContext({
  slots,
}: {
  slots: Record<string, string | number | boolean | null>;
}) {
  const entries = Object.entries(slots);

  return (
    <SessionCard title="Collected context">
      {entries.length === 0 ? (
        <p className="text-xs text-muted-foreground">Nothing collected yet.</p>
      ) : (
        <dl className="space-y-2">
          {entries.map(([k, v]) => (
            <div key={k} className="flex items-start justify-between gap-3">
              <dt className="font-mono text-xs text-muted-foreground">{k}</dt>
              <dd className="max-w-[60%] text-right text-sm text-foreground">{String(v)}</dd>
            </div>
          ))}
        </dl>
      )}
    </SessionCard>
  );
}
