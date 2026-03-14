# P2-M1 LLM Integration Implementation Plan

**Status:** NOT STARTED

## Prerequisites
- Design doc approved: p2-m1-llm-integration-design.md

## Tasks
- [ ] T1: Add Gemini API key + model configuration UI.
Files: app/page.tsx, __tests__/phase2-llm-config.test.tsx
Step 1: Write the failing tests for API key input and model selector.
Step 2: Run tests (expect failure).
`npm test`
Step 3: Implement `geminiApiKey` state, input UI, and model selector with `gemini-2.5-flash` default.
Step 4: Run tests (expect pass).
`npm test`
Step 5: Commit.
`git commit -m "feat(p2): add gemini api key and model settings"`

- [ ] T2: Implement `runGemini` helper and response parsing.
Files: app/page.tsx, __tests__/phase2-llm-runner.test.tsx
Step 1: Write failing tests that mock `fetch` and assert `x-goog-api-key` header and request body shape.
Step 2: Run tests (expect failure).
`npm test`
Step 3: Implement `runGemini` using `generateContent` and parse text output for each action.
Step 4: Run tests (expect pass).
`npm test`
Step 5: Commit.
`git commit -m "feat(p2): add gemini runner helper"`

- [ ] T3: Wire AI buttons (pitch, stack, features, triage).
Files: app/page.tsx, __tests__/phase2-llm-actions.test.tsx
Step 1: Write failing tests for each action path.
Step 2: Run tests (expect failure).
`npm test`
Step 3: Implement button handlers that call `runGemini` and update UI state.
Step 4: Run tests (expect pass).
`npm test`
Step 5: Commit.
`git commit -m "feat(p2): wire gemini actions"`

- [ ] T4: Add loading/error UI states and retry behavior.
Files: app/page.tsx, __tests__/phase2-llm-actions.test.tsx
Step 1: Write failing tests for loading/disabled states and error banners.
Step 2: Run tests (expect failure).
`npm test`
Step 3: Implement per-action status map and retry UI.
Step 4: Run tests (expect pass).
`npm test`
Step 5: Commit.
`git commit -m "feat(p2): add ai loading and error states"`

- [ ] T5: Visual verification for AI-driven flows.
Files: app/page.tsx
Step 1: Run the app and visually verify AI states and responses.
`npm run dev`
Step 2: Confirm prompts and responses render correctly.
Step 3: Commit any visual tweaks.
`git commit -m "chore(p2): polish gemini integration UI"`
