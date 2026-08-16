export type FlowName =
  | "check_bill"
  | "troubleshoot_internet"
  | "upgrade_plan"
  | "report_outage"
  | "human_handoff"
  | (string & {});

export type FlowStatus = "active" | "completed" | "awaiting_backend" | "escalated";

export type ResolutionStatus =
  | "in_progress"
  | "resolved_by_ai"
  | "awaiting_backend"
  | "escalated";

export interface HandoffInfo {
  required: boolean;
  ticket?: string;
  queue?: string;
}

/** Wire contract: POST {VITE_API_BASE_URL}/api/chat */
export interface ChatRequest {
  conversation_id: string;
  message: string;
}

export interface ChatResponse {
  conversation_id: string;
  message: string;
  flow?: FlowName;
  status?: FlowStatus;
  slots?: Record<string, string | number | boolean | null>;
  handoff?: HandoffInfo;
  /** optional developer/debug metadata */
  last_action?: string;
  resolution?: ResolutionStatus;
}

export type MessageRole = "customer" | "assistant";
export type MessageState = "sending" | "sent" | "error";

export interface Message {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: string; // ISO
  state: MessageState;
}

export interface SessionState {
  conversationId: string;
  flow: FlowName | null;
  flowStatus: FlowStatus;
  resolution: ResolutionStatus;
  slots: Record<string, string | number | boolean | null>;
  handoff: HandoffInfo;
  lastAction: string | null;
  backendConnected: boolean;
  customer: {
    id: string;
    service: string;
    region: string;
  };
}
