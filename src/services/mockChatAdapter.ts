import type { ChatRequest, ChatResponse } from "@/types/conversation";

/**
 * Demo-only adapter. Contains NO real conversational logic — Rasa CALM owns that.
 * It exists so the interface can be previewed without a backend and is meant to be
 * deleted (or bypassed by setting VITE_API_BASE_URL) once the API is available.
 */

interface Step {
  match: RegExp;
  reply: ChatResponse;
}

const base = (conversation_id: string) => ({ conversation_id });

const script: Step[] = [
  {
    match: /bill|invoice|charge|payment/i,
    reply: {
      ...base(""),
      message:
        "I can help with billing. Your latest invoice for Fiber 300 is 39.90 EUR, issued on 3 August. Would you like the breakdown?",
      flow: "check_bill",
      status: "active",
      slots: { issue: "billing question", invoice_period: "August" },
      handoff: { required: false },
      last_action: "action_fetch_latest_invoice",
      resolution: "in_progress",
    },
  },
  {
    match: /internet|slow|wifi|connection/i,
    reply: {
      ...base(""),
      message: "I'm sorry about that. Are all of your devices affected, or just one?",
      flow: "troubleshoot_internet",
      status: "active",
      slots: { issue: "slow internet", device_scope: "unknown", outage_detected: false },
      handoff: { required: false },
      last_action: "action_check_line_status",
      resolution: "in_progress",
    },
  },
  {
    match: /all devices|everything|every device|all of them/i,
    reply: {
      ...base(""),
      message:
        "Thanks. I ran a line check and no outage is reported in Athens. Let's restart the router — please unplug it for 30 seconds.",
      flow: "troubleshoot_internet",
      status: "active",
      slots: { issue: "slow internet", device_scope: "all devices", outage_detected: false },
      handoff: { required: false },
      last_action: "action_check_line_status",
      resolution: "in_progress",
    },
  },
  {
    match: /plan|upgrade|package/i,
    reply: {
      ...base(""),
      message:
        "You're on Fiber 300. Fiber 600 is available at your address for 8 EUR more per month. Shall I prepare the change?",
      flow: "upgrade_plan",
      status: "active",
      slots: { current_plan: "Fiber 300", target_plan: "Fiber 600" },
      handoff: { required: false },
      last_action: "action_list_available_plans",
      resolution: "in_progress",
    },
  },
  {
    match: /outage|down|no service/i,
    reply: {
      ...base(""),
      message:
        "I've logged an outage report for your area. Engineers review reports within 60 minutes and you'll receive an SMS update.",
      flow: "report_outage",
      status: "active",
      slots: { issue: "service outage", outage_detected: true },
      handoff: { required: false },
      last_action: "action_report_outage",
      resolution: "awaiting_backend",
    },
  },
  {
    match: /expert|human|agent|advisor|person/i,
    reply: {
      ...base(""),
      message:
        "Of course. I'm transferring you to a specialist and passing along everything we've discussed so you won't need to repeat yourself.",
      flow: "human_handoff",
      status: "escalated",
      slots: { issue: "slow internet", device_scope: "all devices", outage_detected: false },
      handoff: { required: true, ticket: "SUP-1024", queue: "Tier 2 Technical Support" },
      last_action: "action_create_handoff_ticket",
      resolution: "escalated",
    },
  },
];

const fallback: ChatResponse = {
  conversation_id: "",
  message:
    "Thanks for the detail. Could you tell me a little more so I can route this to the right flow?",
  status: "active",
  handoff: { required: false },
  last_action: "action_listen",
  resolution: "in_progress",
};

export async function mockSendMessage(req: ChatRequest): Promise<ChatResponse> {
  await new Promise((r) => setTimeout(r, 700 + Math.random() * 600));
  const hit = script.find((s) => s.match.test(req.message));
  const reply = hit ? hit.reply : fallback;
  return { ...reply, conversation_id: req.conversation_id };
}
