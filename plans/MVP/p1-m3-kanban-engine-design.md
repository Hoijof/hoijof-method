# P1-M3 Kanban Engine Design

**Status:** APPROVED

## Goal
Define the Step 4 kanban phasing engine, drag-and-drop behavior, dynamic phase creation, and column collapsing.

## Decisions
- Build Step 4 as a single-page section in `app/page.tsx` consistent with the M1 wizard shell.
- Use a horizontal, scrollable Kanban layout with a fixed "Feature Pool" column plus dynamic phase columns.
- Default phases: `MVP`, `Phase 2`, `Backlog`. Users can insert new phases before `Backlog`.
- Use native HTML5 drag-and-drop for MVP; mobile/touch improvements are tracked as I1.
- Allow inline feature creation per column; new features inherit the column's phase and default to `P2`.
- Support column collapsing to a thin rail with vertical label and feature count.
- Surface a lightweight MVP overload warning if more than 5 items are in the `MVP` column.
- Provide an "Auto-Triage Remaining" button as a UI placeholder; logic deferred to P6.

## Architectural Design
### Data Model
- `features: FeatureItem[]` where `FeatureItem` includes `phase`.
- `dynamicPhases: string[]` containing `"MVP"`, `"Phase 2"`, `"Backlog"`, and any user-added phases.
- `collapsedPhases: Record<string, boolean>` for column collapse state.
- `inlineInputs: Record<string, string>` for per-column add inputs.
- `dragItemId: string | null` to track the dragged feature.

### UI Impacts
- Step 4 renders a Kanban board with columns for `Feature Pool`, each dynamic phase, and `Backlog`.
- Each column displays a header with title, count, and a collapse toggle.
- Cards show feature text and priority indicator; delete action shown on hover.
- Inline add input per column for quick feature entry.
- `Add Phase` and `Auto-Triage Remaining` controls shown above the board.

### Type Updates
- Update `FeatureItem` to include `phase: string`.
- Add `type PhaseName = string` if needed for clarity in the Kanban helpers.

## Testing Strategy
- Verify columns render for Pool + default phases and show correct counts.
- Verify moving a card between columns updates its phase.
- Verify adding a phase inserts it before Backlog.
- Verify collapsing a column hides cards and shows a compact rail.
- Verify inline add creates a card within the target phase.
