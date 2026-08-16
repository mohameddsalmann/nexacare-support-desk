import { API_BASE_URL, USE_MOCK_ADAPTER } from "@/config";
import { mockSendMessage } from "./mockChatAdapter";
import type { ChatRequest, ChatResponse } from "@/types/conversation";

export class ChatApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ChatApiError";
  }
}

/**
 * Single entry point for the backend conversation API.
 * Swap the adapter by setting VITE_API_BASE_URL — no component changes required.
 */
export async function sendMessage(req: ChatRequest): Promise<ChatResponse> {
  if (USE_MOCK_ADAPTER) return mockSendMessage(req);

  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL.replace(/\/$/, "")}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req),
    });
  } catch {
    throw new ChatApiError("Unable to reach the support service.");
  }

  if (!res.ok) throw new ChatApiError(`Support service returned ${res.status}.`);
  return (await res.json()) as ChatResponse;
}

export const isMockBackend = USE_MOCK_ADAPTER;
