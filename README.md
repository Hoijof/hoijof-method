# Hoijof Process Creator

Hoijof Process Creator (Hoijof Builder) is a client-only web app that guides developers through a progressive disclosure wizard to turn raw ideas into structured, AI-ready Hoijof documentation.

## Current Status (as of 2026-03-14)

- MVP is complete: Steps 1-5, feature backlog, Kanban phasing, and export flow.
- Phase 2 is implemented: Gemini-powered "Magic Buttons", LocalStorage persistence, and ad placements.
- Phase 3 is TBD.

## Highlights

- 5-step wizard with consolidated state and navigation.
- Feature backlog with P1/P2/P3 priorities and phase assignment.
- Drag-and-drop Kanban phasing with dynamic phases and collapsible columns.
- Markdown PRD + phase roadmap generation with JSZip download.
- Gemini API integration for pitch, stack, feature, and triage assistance.
- LocalStorage persistence with a reset option.
- Banner and right-rail ad slots (config-driven).

## Tech Stack

- Next.js 16, React 19, TailwindCSS 4
- JSZip (client-side)
- Jest + React Testing Library

## Quick Start

1. `npm install`
2. `npm run dev`
3. Open `http://localhost:3000`

## Tests

- `npm test`

## Gemini Notes

Gemini requires a Google AI Studio API key. The key is entered in the UI and used only in the client. It is not persisted in LocalStorage.

## Docs and Plans

- `hoijof-process.md`
- `plans/MVP/mvp-final-status.md`
- `plans/Phase2/phase2-roadmap.md`
- `plans/Phase3/phase3-roadmap.md`

## Repo Structure

- `app/` - Next.js app and wizard UI.
- `public/` - Branding assets (logo, favicon).
- `__tests__/` - Jest/RTL test suite.

