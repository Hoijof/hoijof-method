# P2-M1 LLM Integration Design

**Status:** APPROVED

## Goal
Replace simulated AI buttons with real API-backed responses for pitch enhancement, stack suggestions, feature suggestions, and triage.

## Decisions
- Use the Gemini API (Google AI Studio) with the standard `generateContent` endpoint for all AI actions.
- Authenticate via a user-provided Gemini API key (entered in-app), sent as `x-goog-api-key` header.
- Default model: `gemini-2.5-flash` (stable, price-performance). Allow override via a simple model selector.
- Keep calls client-side for Phase 2 (no backend yet), but show a warning that keys are exposed in the browser and recommend a server proxy for production.
- Normalize Gemini responses into the existing UI state: enhanced pitch text, selected stack, appended features, and triaged phase assignments.
- Use a single `runGemini(prompt, schema?)` helper to consolidate request/response handling.

## Architectural Design
### Data Model
- `geminiApiKey: string` stored in memory (optionally persisted in LocalStorage in P2-M2).
- `geminiModel: string` defaulting to `gemini-2.5-flash`.
- `aiStatus: { pitch: "idle" | "loading" | "error"; stack: ... }` to track button-level loading/error.

### UI Impacts
- Add a lightweight API key input panel in Step 1 or a top-level settings drawer.
- Add a model selector with the default set to `gemini-2.5-flash`.
- Replace "AI Magic" placeholders with live calls and error messaging.

### Type Updates
- Add `type AiAction = "pitch" | "stack" | "features" | "triage"`.
- Add `type AiStatusMap = Record<AiAction, "idle" | "loading" | "error">`.

## Testing Strategy
- Mock `fetch` for Gemini API calls and validate request body/headers include `x-goog-api-key`.
- Verify each AI button transitions to loading and then updates the correct state.
- Verify error paths display a non-blocking message and restore UI state.
