import { FlowStatus } from "./FlowStatus";
import { CustomerContext } from "./CustomerContext";
import { CollectedContext } from "./CollectedContext";
import { ResolutionStatus } from "./ResolutionStatus";
import { HandoffStatus } from "./HandoffStatus";
import { ConversationDetails } from "./ConversationDetails";
import type { SessionState } from "@/types/conversation";

export function SessionPanel({ session }: { session: SessionState }) {
  return (
    <aside className="space-y-3">
      <h2 className="tp-eyebrow">Session intelligence</h2>
      <FlowStatus flow={session.flow} status={session.flowStatus} />
      <CustomerContext customer={session.customer} />
      <CollectedContext slots={session.slots} />
      <ResolutionStatus status={session.resolution} />
      <HandoffStatus handoff={session.handoff} />
      <ConversationDetails session={session} />
    </aside>
  );
}
