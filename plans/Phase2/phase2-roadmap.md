# Phase 2 Roadmap

## Goal & Status

**Goal:** Expand the Hoijof App Builder with real AI integrations and persistence so users can complete full planning sessions without losing work.
**Status:** 🔴 NOT STARTED

## Task Tracking

### Priorities

- [ ] P1: Integrate Gemini API (Google AI Studio) for the "Magic Buttons".
- [ ] P2: Implement LocalStorage persistence so users don't lose progress on refresh.


## Milestone Details

### Milestone 1: LLM Integration

**Goal:** Replace simulated AI buttons with Gemini API-backed responses for pitch enhancement, stack suggestions, feature suggestions, and triage.
**Dependencies:** None
**Design Doc:** p2-m1-llm-integration-design.md
**Implementation:** p2-m1-llm-integration.md

### Milestone 2: Persistence Layer

**Goal:** Persist wizard state to LocalStorage and restore on reload.
**Dependencies:** Milestone 1
**Design Doc:** p2-m2-persistence-design.md
**Implementation:** p2-m2-persistence.md

### Milestone 3: Ads

**Goal:** Add AD infrastructure and ads to the page.
**Dependencies:** None
**Design Doc:** p2-m3-ad-design.md
**Implementation:** p2-m3-ad.md

## Dependency Graph

```
[M1: LLM Integration]
  └── [M2: Persistence]
       └── [M3: Ads]
```

## Implementation Order

- Wave 1: Real AI integration (M1, P1).
- Wave 2: Persistence and quality-of-life (M2, P2).
- Wave 3: Ads

## Memory Log (Append-Only)

- **[2026-03-14]**: Phase 2 roadmap initialized after MVP UI foundation and export system.
