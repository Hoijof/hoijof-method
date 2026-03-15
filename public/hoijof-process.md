# The Hoijof Process

_Last updated: 2026-03-14_

The "Hoijof Process" is a structured, documentation-first, and AI-friendly software development methodology designed to successfully deliver complex projects systematically with high test coverage and transparent decision-making. It is tailored to handle large context applications and maximize the efficiency of AI coding assistants.

---

## Quick Start (TL;DR)

1. **Check the Roadmap:** Read the current Phase Roadmap to understand the next priority and overarching goal.
2. **Read/Write the Design Doc:** Outline the "What" and the "Why" for the upcoming feature before any code is written. Get it approved.
3. **Follow the Implementation Plan:** Execute the strict Test-Driven Development (TDD) loop task-by-task.
4. **Context Reset:** Once a milestone is complete, update the Roadmap's append-only Memory Log, clear your AI session, and start fresh.
5. **Phase Close-Out:** When all milestones in a phase are done, write the final status document (`phaseX-final-status.md`) and create the next phase's roadmap.
6. **Starting prompt:**

```
Let's read our plans/Phase2/phase2-roadmap.md and plan our next task.
Read the previous final status docs to understand what's been done:
@plans/MVP/mvp-final-status.md
Please ask me any questions you may get along the way.
```

> Update the file references above when starting a new phase.

---

## Process Gates (Required)

These gates are the definition of "allowed to proceed" for Hoijof work. If a gate is not met, the work is considered **blocked**.

- **Gate A (Roadmap Focus):** The current task exists in the active Phase Roadmap and is explicitly the focus (one "current" milestone at a time).
- **Gate B (Design Approved):** A Design Doc exists for the milestone and includes `Status: APPROVED`.
- **Gate C (TDD Task Structure):** Implementation plan tasks are written as a strict loop:
  - Write the failing test (commit or checkpoint).
  - Implement the minimal code to pass.
  - Run tests and verify pass.
  - Mark the task checkbox complete.
- **Gate D (Milestone Done):** A milestone is only "Done" when:
  - `npm test` is green.
  - `npm run build` is green.
  - UI is visually sanity-checked (when applicable).
  - Roadmap Memory Log is updated with a dated entry.

## Status Vocabulary (Standard)

To keep docs and automation consistent, use only these values:

- **Phase/Milestone Status:** `NOT STARTED` | `IN PROGRESS` | `BLOCKED` | `DONE`
- **Design Doc Status:** `DRAFT` | `IN REVIEW` | `APPROVED` | `SUPERSEDED`

## Required Doc Front Matter

Every roadmap and milestone doc should include:

- `_Last updated: YYYY-MM-DD_` near the top.
- A `Status:` line using the standardized vocabulary above.

## Folder Structure Overview

```text
/plans
  /MVP/
    mvp-final-status.md                    # Final status doc for MVP
  /Phase2/
    phase2-roadmap.md                      # Master roadmap
    phase2-final-status.md                 # Final status doc
    p2-*.md                                # Implementation plans
    ...
  /Phase3/
    phase3-roadmap.md
    phase3-final-status.md
    ...
  /PhaseX/
    phaseX-roadmap.md                      # The master roadmap for the phase
    phaseX-final-status.md                 # Written when phase completes
    pX-feature-name-design.md             # The architecture & decisions
    pX-feature-name.md                    # The granular TDD execution plan
```

---

## 1. Phased Master Roadmaps

Work is organized into major, themed Phases (e.g., "Phase 2: SaaS & Auth", "Phase 3: Scale & Intelligence"). Each phase relies on a comprehensive roadmap document (`plans/PhaseX/phaseX-roadmap.md`):

- **Goal & Status:** The high-level objective and completion status for the entire phase.
- **Task Tracking:** Feature lists categorized with specific tags like Priorities (P1, P2...), Improvements (I1, I2...), Bugs/Fixes (F1, F2...), and Backlog/Moonshots (B1, B2...).
  - *Note on Bugs/Debt:* Bugs get assigned `Fix-X` numbers, and refactoring/tech debt is explicitly scheduled as an Improvement (`I-X`) to prevent them from taking over the priority pipeline.
- **Milestone Details:** A deep-dive into each feature's specific goal, dependencies, and complexity rating.
- **Dependency Graph:** A visual hierarchy mapped in plain text to determine strict blockers vs. parallel tracks.
- **Implementation Order:** Features are batched into logical "Waves" based on priority and dependencies (e.g., "Wave 1 — UX Foundation").
- **Memory Log:** A running append-only changelog at the bottom of the roadmap tracking progress, completed items, and context shifts. This acts as a rolling context summary for re-orienting AI assistants.

## 2. Feature Design Documents

Before writing any code, every major milestone gets a concise Design Document (e.g., `plans/PhaseX/pX-feature-name-design.md`).

- Focuses purely on the "What" and the "Why".
- Contains the overall Goal, Decisions (a bulleted list of key technical and product choices), Architectural Design (Data models, API contracts, UI impacts, type updates), and a specific Testing Strategy.
- Explicit approval state (e.g., `Status: APPROVED`) is required before implementation begins.

## 3. Strict TDD Implementation Plans

Once designed and approved, an Execution/Implementation Plan is created (e.g., `plans/PhaseX/pX-feature-name.md`). It breaks the feature into extremely granular Tasks, enforcing a strict test-driven development (TDD) loop that guarantees functionality is confirmed at every step. Each task explicitly documents:

- **Files involved** (Create or Modify).
- **Step 1: Write the failing tests** (Providing the actual test code expected).
- **Step 2: Run tests to verify they fail** (Documenting the exact CLI command and the expected failure reason).
- **Step 3: Write the implementation** (Providing the core logic or UI code).
- **Step 4: Run tests to verify they pass** (Ensuring the feature is totally complete and green).
- **Step 5: Atomic Commit** (Providing the exact `git commit` command using conventional commits, e.g., `git commit -m "feat(p5): add toast UI"`).

### Definition of Done (DoD)

A task or milestone is only considered "Done" when:

1. Tests are written and passing locally.
2. Production build succeeds locally (`npm run build`).
3. The UI is visually verified (if applicable).
4. An atomic commit is made describing the change.
5. The task is marked complete `[x]` in BOTH the Implementation Plan AND the Phase Roadmap.

## 4. Phase Close-Out

When all milestones in a phase are complete, a final status document is written to close the phase:

- **File:** `plans/PhaseX/phaseX-final-status.md`
- **Contents:** Overview (milestone count, test count, one-paragraph summary), completed milestones table, architecture additions, test growth table, tech stack additions, key files & directories.
- **Format:** Follow the structure established in previous final status docs (see `plans/Phase3/phase3-final-status.md` as template).
- **Then:** Create `plans/PhaseY/phaseY-roadmap.md` for the next phase, update the starting prompt references above, and begin a fresh AI session.

## 5. AI & Agent Collaboration

This process is heavily optimized for collaboration with AI agents and Large Language Models.

- **Explicit Prompting:** Implementation plans often include direct narrative instructions and constraints for the AI at the top (e.g., `> **For Claude:** REQUIRED SUB-SKILL... use superpowers:executing-plans to implement this plan task-by-task.`).
- **Context Priming:** The combination setup (Master Roadmaps -> Design Docs -> Implementation Plans) restricts noise and creates a perfect context window hierarchy for an AI to digest the overarching goal, process the architecture, and seamlessly execute the immediate TDD task loop without hallucinations.
- **Context Reset Protocol:** As AI context windows fill up over long coding sessions, the AI can become slower or prone to errors.
  - Once a milestone is complete, add a summary of what was done to the Phase Roadmap's **Memory Log**.
  - Close the current chat session entirely.
  - Start a fresh session, feeding the AI *only* the updated Phase Roadmap and the next Design Document/Implementation Plan. This guarantees a clean, focused context window for the next task.
