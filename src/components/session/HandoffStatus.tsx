import { UserRoundCheck } from "lucide-react";
import { SessionCard } from "./SessionCard";
import type { HandoffInfo } from "@/types/conversation";

export function HandoffStatus({ handoff }: { handoff: HandoffInfo }) {
  if (!handoff.required) {
    return (
      <SessionCard title="Human handoff">
        <p className="text-sm text-foreground">Not required</p>
      </SessionCard>
    );
  }

  return (
    <SessionCard title="Human handoff">
      <div className="rounded-lg border border-warn/40 bg-warn-soft p-3">
        <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <UserRoundCheck strokeWidth={1.5} className="h-4 w-4 text-warn" />
          Required
        </p>
        <dl className="mt-3 space-y-2">
          {handoff.ticket && (
            <div className="flex items-center justify-between gap-3">
              <dt className="text-xs text-muted-foreground">Ticket</dt>
              <dd className="font-mono text-sm text-foreground">{handoff.ticket}</dd>
            </div>
          )}
          {handoff.queue && (
            <div className="flex items-center justify-between gap-3">
              <dt className="text-xs text-muted-foreground">Queue</dt>
              <dd className="text-sm text-foreground">{handoff.queue}</dd>
            </div>
          )}
        </dl>
      </div>
    </SessionCard>
  );
}
