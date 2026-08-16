import { SessionCard } from "./SessionCard";
import type { FlowName, FlowStatus as FlowStatusType } from "@/types/conversation";

const LABEL: Record<string, string> = {
  active: "Active",
  completed: "Completed",
  awaiting_backend: "Awaiting backend",
  escalated: "Escalated",
};

export function FlowStatus({
  flow,
  status,
}: {
  flow: FlowName | null;
  status: FlowStatusType;
}) {
  return (
    <SessionCard
      title="Active flow"
      action={
        <span className="rounded-md border border-tp-pink/30 bg-tp-pink-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-tp-pink">
          {LABEL[status] ?? status}
        </span>
      }
    >
      <p className="font-mono text-sm text-foreground">{flow ?? "—"}</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Flow selection is handled by the conversational backend.
      </p>
    </SessionCard>
  );
}
