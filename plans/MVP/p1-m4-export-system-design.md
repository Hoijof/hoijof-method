# P1-M4 Export System Design

**Status:** APPROVED

## Goal
Define how Step 5 compiles the global state into PRD and phase-specific markdown files and packages them into a client-side ZIP.

## Decisions
- Implement markdown generation as pure functions within `app/page.tsx` for MVP.
- PRD output includes overview, target market, technical architecture, and phased scope.
- Phase roadmap output mirrors Hoijof roadmap sections: Goal & Status, Task Tracking, Tech Stack, Memory Log.
- Use client-side JSZip via dynamic import (npm dependency) instead of CDN loading.
- Provide copy-to-clipboard buttons for PRD and each phase roadmap preview.
- Render markdown previews in scrollable code blocks within Step 5.
- Export button generates a ZIP containing `PRD.md` and `plans/<PhaseName>/<phase>-roadmap.md` files (excluding Backlog).

## Architectural Design
### Data Model
- `features` already include `priority` and `phase`; use these for sorted output.
- `appData`, `selectedStack`, `dynamicPhases` feed into PRD and phase roadmap generators.
- `isZipping: boolean` for export loading state.

### UI Impacts
- Step 5 renders an export header with a primary "Download All as ZIP" CTA.
- Left column displays PRD preview; right column lists phase roadmap previews with copy buttons.
- Use dark preview panel for PRD and light panels for phase roadmaps to mirror the prototype.

### Type Updates
- Add helper types if needed for generator inputs: `ExportContext`.

## Testing Strategy
- Verify PRD generator includes app name, pitch, and stack info.
- Verify phase roadmap generator includes tasks sorted by priority.
- Verify ZIP generation includes expected filenames and content.
