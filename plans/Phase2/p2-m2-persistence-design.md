# P2-M2 Persistence Design

**Status:** APPROVED

## Goal
Persist wizard state to LocalStorage and restore it on reload so users don't lose progress.

## Decisions
- Persist all wizard state needed to resume work: `currentStep`, `appData`, `selectedStack`, `features`, `dynamicPhases`, `collapsedPhases`, and `inlineInputs`.
- Store data in `localStorage` under a versioned key: `hoijof.appbuilder.state.v1`.
- Load once on initial mount; if the payload is invalid or incompatible, ignore and fall back to defaults.
- Save on state changes with a debounce (250-500ms) to avoid excessive writes.
- Provide a manual "Reset Wizard" action that clears LocalStorage and resets state.
- Do not persist sensitive `geminiApiKey` by default; only store it if the user opts in later.

## Architectural Design
### Data Model
- `type PersistedStateV1 = { version: 1; currentStep: number; appData: AppData; selectedStack: string; features: FeatureItem[]; dynamicPhases: string[]; collapsedPhases: Record<string, boolean>; inlineInputs: Record<string, string>; }`

### UI Impacts
- Add a small settings row in Step 1 or top-level header with a "Reset Wizard" button.
- Optionally show a subtle "Restored from previous session" toast/banner after successful load.

### Type Updates
- Add `type PersistedStateV1` and helper guards.

## Testing Strategy
- Mock `localStorage` and verify load hydrates state.
- Verify save writes on state changes (debounced).
- Verify reset clears storage and resets state.
