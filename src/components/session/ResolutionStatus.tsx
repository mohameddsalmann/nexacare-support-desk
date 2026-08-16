import { SessionCard } from "./SessionCard";
import type { ResolutionStatus as Status } from "@/types/conversation";

const LABEL: Record<Status, string> = {
  in_progress: "In progress",
  resolved_by_ai: "Resolved by AI",
  awaiting_backend: "Awaiting backend",
  escalated: "Escalated",
};

const DOT: Record<Status, string> = {
  in_progress: "bg-tp-pink",
  resolved_by_ai: "bg-ok",
  awaiting_backend: "bg-muted-foreground",
  escalated: "bg-warn",
};

export function ResolutionStatus({ status }: { status: Status }) {
  return (
    <SessionCard title="Resolution">
      <div className="flex items-center gap-2.5">
        <span className={`h-2 w-2 rounded-full ${DOT[status]}`} />
        <span className="text-sm font-medium text-foreground">{LABEL[status]}</span>
      </div>
    </SessionCard>
  );
}
