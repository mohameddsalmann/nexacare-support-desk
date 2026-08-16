import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { ChatShell } from "@/components/chat/ChatShell";
import { SessionPanel } from "@/components/session/SessionPanel";
import { useConversation } from "@/hooks/useConversation";

const title = "NexaCare AI Support — Conversational AI demo";
const description =
  "A TP-style enterprise customer support assistant demo: live conversation panel with session intelligence, flows, collected context and human handoff.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { messages, session, typing, send, retry } = useConversation();

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_minmax(300px,33%)] lg:py-8">
        <ChatShell
          conversationId={session.conversationId}
          messages={messages}
          typing={typing}
          onSend={send}
          onRetry={retry}
        />
        <SessionPanel session={session} />
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto max-w-[1400px] px-4 py-5 text-xs text-muted-foreground sm:px-6">
          Fictional demo application. All customer data shown is sample data.
        </div>
      </footer>
    </div>
  );
}
