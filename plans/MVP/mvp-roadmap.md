# MVP Phase Roadmap

## Goal & Status

**Goal:** Successfully launch the Minimum Viable Product for the Hoijof App Builder, a client-side web application that allows developers to materialize raw app ideas and export them into strict, AI-ready Hoijof documentation.
**Pitch:** A Progressive Disclosure Wizard that acts as an "Idea Lander" to help developers materialize their raw app ideas into AI-ready Hoijof process documentation, preventing scope creep and ensuring structured phased roadmaps.
**Tech Stack:** React, TailwindCSS, JSZip (Client-side only, no backend required for MVP)
**Status:** 🔴 NOT STARTED

## Task Tracking

### Priorities

- [ ] P1: Scaffold the core 5-step Progressive Wizard UI framework with navigation.
- [ ] P2: Implement Step 1 (Project Foundation) & Step 2 (Tech Stack Presets) forms.
- [ ] P3: Implement Step 3 (Feature Brainstorm) with vertical list and P1/P2/P3 priority assignment.
- [ ] P4: Implement Step 4 (Hoijof Phasing) drag-and-drop Kanban board with dynamic phase creation and column collapsing.
- [ ] P5: Implement Step 5 (Export Docs) with dynamic PRD/Markdown generation and JSZip download integration.
- [ ] P6: Implement simulated "AI Magic Buttons" (UI placeholders that mock AI functionality to validate UX).

### Improvements & Tech Debt

- [ ] I1: Refactor Kanban board to ensure mobile touch-drag compatibility.

### Phase 2 & Backlog

- [ ] Phase 2: Integrate real LLM API (OpenAI/Anthropic) for the "Magic Buttons".
- [ ] Phase 2: Implement LocalStorage persistence so users don't lose progress on refresh.
- [ ] Backlog: GitHub API integration to automatically create PRs/Issues from the roadmap.

## Milestone Details

### Milestone 1: Wizard Framework & Basic Forms

**Goal:** Set up the React app, routing/state for the 5 steps, and build the static forms for Steps 1 & 2.
**Dependencies:** None
**Design Doc:** p1-m1-wizard-framework-design.md
**Implementation:** p1-m1-wizard-framework.md

### Milestone 2: Feature Backlog & Priority System

**Goal:** Build Step 3's feature input system, allowing users to add/delete features and assign P1/P2/P3 priorities.
**Dependencies:** Milestone 1
**Design Doc:** p1-m2-feature-backlog-design.md
**Implementation:** p1-m2-feature-backlog.md

### Milestone 3: Kanban Phasing Engine

**Goal:** Build the native HTML5 drag-and-drop Kanban board for Step 4, including inline task addition and dynamic phase generation.
**Dependencies:** Milestone 2
**Design Doc:** p1-m3-kanban-engine-design.md
**Implementation:** p1-m3-kanban-engine.md

### Milestone 4: Markdown Generation & ZIP Export

**Goal:** Implement the logic to compile the global state into a PRD and phase-specific markdown files, and bundle them using JSZip.
**Dependencies:** Milestone 3
**Design Doc:** p1-m4-export-system-design.md
**Implementation:** p1-m4-export-system.md

## Dependency Graph

```
[M1: Wizard Framework] 
  └── [M2: Feature Backlog]
       └── [M3: Kanban Engine]
            └── [M4: Export System]
```

## Implementation Order

- Wave 1: Wizard framework and basic forms (M1, P1, P2).

- Wave 2: Feature backlog and priority system (M2, P3).
- Wave 3: Kanban phasing engine and touch-drag hardening (M3, P4, I1).
- Wave 4: Export system and UX polish for AI placeholders (M4, P5, P6).

## Memory Log (Append-Only)

- **[2026-03-14]**: MVP Phase initialized based on final prototype UI. Real AI integration pushed to Phase 2 to accelerate initial launch. Reviewed schafolding.tsx to align visual direction.
- **[2026-03-14]**: MVP completed. Final status documented in mvp-final-status.md and Phase 2 planning initiated.
