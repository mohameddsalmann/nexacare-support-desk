export const API_BASE_URL: string =
  (import.meta.env["VITE_API_BASE_URL"] as string | undefined) ?? "";

/** When no backend base URL is configured, the UI runs on the demo adapter. */
export const USE_MOCK_ADAPTER = API_BASE_URL.trim().length === 0;

export const DEMO_CONVERSATION_ID = "conv_demo_001";
