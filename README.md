# NexaCare AI Support — Frontend

Frontend-only conversational AI support interface. The backend (Rasa CALM / FastAPI) lives outside this project.

## Installation

```bash
bun install
```

## Development

```bash
bun run dev
```

## Production build

```bash
bun run build
```

## Environment variable

```
VITE_API_BASE_URL=http://localhost:8000
```

When unset, the UI runs on the local demo adapter in `src/services/mockChatAdapter.ts`.

## Backend API contract

TypeScript interfaces: `src/types/conversation.ts`
HTTP client: `src/services/chatApi.ts` (`POST {VITE_API_BASE_URL}/api/chat`)
