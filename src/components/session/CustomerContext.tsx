import { SessionCard } from "./SessionCard";

export function CustomerContext({
  customer,
}: {
  customer: { id: string; service: string; region: string };
}) {
  const rows = [
    ["Customer ID", customer.id],
    ["Service", customer.service],
    ["Region", customer.region],
  ];

  return (
    <SessionCard title="Customer">
      <dl className="divide-y divide-line">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-3 py-2 first:pt-0 last:pb-0">
            <dt className="text-xs text-muted-foreground">{k}</dt>
            <dd className="text-sm font-medium text-foreground">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-[11px] text-muted-foreground">Sample data — fictional customer.</p>
    </SessionCard>
  );
}
