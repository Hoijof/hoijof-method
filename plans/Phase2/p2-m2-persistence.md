# P2-M2 Persistence Implementation Plan

**Status:** NOT STARTED

## Prerequisites
- Design doc approved: p2-m2-persistence-design.md

## Tasks
- [ ] T1: Define persisted state shape and serialization helpers.
Files: app/page.tsx, __tests__/phase2-persistence.test.tsx
Step 1: Write failing tests for serialization/validation helpers.
Step 2: Run tests (expect failure).
`npm test`
Step 3: Implement `PersistedStateV1`, `serializeState`, and `parseState`.
Step 4: Run tests (expect pass).
`npm test`
Step 5: Commit.
`git commit -m "feat(p2): add persistence helpers"`

- [ ] T2: Implement load on startup and debounced save.
Files: app/page.tsx, __tests__/phase2-persistence.test.tsx
Step 1: Write failing tests that mock `localStorage` and verify hydration.
Step 2: Run tests (expect failure).
`npm test`
Step 3: Add `useEffect` on mount to load state and `useEffect` with debounce to save.
Step 4: Run tests (expect pass).
`npm test`
Step 5: Commit.
`git commit -m "feat(p2): add localStorage hydration"`

- [ ] T3: Add reset and clear behavior.
Files: app/page.tsx, __tests__/phase2-persistence.test.tsx
Step 1: Write failing tests for reset action.
Step 2: Run tests (expect failure).
`npm test`
Step 3: Implement "Reset Wizard" button that clears storage and state.
Step 4: Run tests (expect pass).
`npm test`
Step 5: Commit.
`git commit -m "feat(p2): add reset for persisted state"`

- [ ] T4: Visual verification for persistence flows.
Files: app/page.tsx
Step 1: Run the app and verify persistence across reload.
`npm run dev`
Step 2: Confirm reset clears state.
Step 3: Commit any visual tweaks.
`git commit -m "chore(p2): polish persistence UX"`
