# P1-M1 Wizard Framework Design

**Status:** APPROVED

## Goal
Define the architecture and UX decisions for the 5-step wizard framework and the base form surfaces for Steps 1 and 2, aligned to the current prototype styling in schafolding.tsx.

## Decisions
- Use a single client-rendered page for the MVP wizard (`app/page.tsx`) with local React state, no routing between steps.
- Represent steps as metadata (`id`, `title`) to drive the stepper, labels, and navigation.
- Store Step 1 values in a single `appData` object: `name`, `pitch`, `audience`, `monetization`.
- Store Step 2 selection as `selectedStack` and define `STACK_PRESETS` as a local constant array.
- Provide visible but non-committal AI affordances (buttons) in Steps 1 and 2; functional "AI Magic" is explicitly deferred to P6.
- Match the prototype visual language: top sticky header, progress stepper bar, central card container, slate/indigo palette, rounded panels, subtle shadowing.
- Keep validation lightweight: required field handling is limited to button enablement or soft hints; no hard gating for navigation in M1.
- Accessibility: use visible labels, focus rings, and `aria-current="step"` for the active step indicator; navigation buttons reflect disabled states.

## Architectural Design
### Data Model
- `currentStep: number` (1-5) controls which step content is rendered.
- `steps: WizardStep[]` array drives the stepper and labels.
- `appData: { name: string; pitch: string; audience: string; monetization: string }` for Step 1 inputs.
- `selectedStack: string` for Step 2 selection.
- `stackPresets: StackPreset[]` with `id`, `name`, `desc` for display.

### UI Impacts
- Replace the default Next.js starter page with the wizard shell.
- Add a top sticky header with the "Hoijof App Builder" brand and icon.
- Add a stepper with progress bar and labeled nodes matching the prototype.
- Render Step 1 and Step 2 forms inside a central card container; Steps 3-5 can be placeholders at M1.
- Add bottom navigation controls for Back and Next.

### Type Updates
- Introduce `type WizardStep = { id: number; title: string }`.
- Introduce `type AppData = { name: string; pitch: string; audience: string; monetization: string }`.
- Introduce `type StackPreset = { id: string; name: string; desc: string }`.

## Testing Strategy
- Add a component test harness using Jest + React Testing Library.
- Verify wizard shell renders the stepper with 5 steps and "Project Foundation" as the initial active step.
- Verify step navigation (Next/Back) updates the visible step content.
- Verify Step 1 inputs are controlled and the "Enhance Pitch" button is disabled when pitch is empty.
- Verify Step 2 selection updates the selected state and remains single-select.
