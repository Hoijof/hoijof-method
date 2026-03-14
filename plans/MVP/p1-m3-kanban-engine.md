# P1-M3 Kanban Engine Implementation Plan

**Status:** NOT STARTED

## Prerequisites
- Design doc approved: p1-m3-kanban-engine-design.md

## Tasks
- [ ] T1: Implement Step 4 layout with Pool + default phases.
Files: app/page.tsx, __tests__/wizard-step4.test.tsx
Step 1: Write the failing tests.
```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../app/page";

describe("Step 4 kanban layout", () => {
  it("renders Pool and default phase columns", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    expect(screen.getByText(/Feature Pool/i)).toBeInTheDocument();
    expect(screen.getByText("MVP")).toBeInTheDocument();
    expect(screen.getByText("Phase 2")).toBeInTheDocument();
    expect(screen.getByText("Backlog")).toBeInTheDocument();
  });
});
```
Step 2: Run tests (expect failure: Step 4 UI not present).
`npm test`
Step 3: Implement Step 4 kanban shell with columns and counts.
Details: Render the board with Pool + dynamic phases and display a count badge per column.
Step 4: Run tests (expect pass).
`npm test`
Step 5: Commit.
`git commit -m "feat(p1): add step 4 kanban layout"`

- [ ] T2: Implement inline add per column.
Files: app/page.tsx, __tests__/wizard-step4.test.tsx
Step 1: Write the failing tests.
```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../app/page";

describe("Step 4 inline add", () => {
  it("adds a card into the selected phase", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    const input = screen.getByPlaceholderText(/Add to MVP/i);
    await user.type(input, "Onboarding");
    await user.keyboard("{enter}");
    expect(screen.getByText("Onboarding")).toBeInTheDocument();
  });
});
```
Step 2: Run tests (expect failure: inline add not wired).
`npm test`
Step 3: Implement inline add input per column.
Details: Add `inlineInputs` state keyed by phase and append new items with that phase.
Step 4: Run tests (expect pass).
`npm test`
Step 5: Commit.
`git commit -m "feat(p1): add step 4 inline add"`

- [ ] T3: Implement drag-and-drop phase reassignment.
Files: app/page.tsx, __tests__/wizard-step4.test.tsx
Step 1: Write the failing tests.
```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../app/page";

describe("Step 4 drag and drop", () => {
  it("moves a card to another phase", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    const input = screen.getByPlaceholderText(/Add to MVP/i);
    await user.type(input, "Billing");
    await user.keyboard("{enter}");
    const card = screen.getByText("Billing");
    const target = screen.getByTestId("phase-Phase 2");
    const dataTransfer = {
      setData: () => {},
      getData: () => "",
    };
    fireEvent.dragStart(card, { dataTransfer });
    fireEvent.dragOver(target, { dataTransfer });
    fireEvent.drop(target, { dataTransfer });
    expect(screen.getByTestId("phase-Phase 2")).toHaveTextContent("Billing");
  });
});
```
Step 2: Run tests (expect failure: DnD not wired).
`npm test`
Step 3: Implement drag-and-drop state updates.
Details: Track `dragItemId`, set `onDragStart`, `onDragOver`, and `onDrop` to update the feature phase.
Step 4: Run tests (expect pass).
`npm test`
Step 5: Commit.
`git commit -m "feat(p1): add step 4 drag and drop"`

- [ ] T4: Implement Add Phase and column collapse.
Files: app/page.tsx, __tests__/wizard-step4.test.tsx
Step 1: Write the failing tests.
```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../app/page";

describe("Step 4 phases and collapse", () => {
  it("adds a new phase before Backlog", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    await user.click(screen.getByRole("button", { name: /Add Phase/i }));
    expect(screen.getByText("Phase 3")).toBeInTheDocument();
  });

  it("collapses a column to compact mode", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    await user.click(screen.getByRole("button", { name: /Collapse MVP/i }));
    expect(screen.getByTestId("phase-MVP")).toHaveAttribute(
      "data-collapsed",
      "true"
    );
  });
});
```
Step 2: Run tests (expect failure: add phase and collapse not present).
`npm test`
Step 3: Implement `Add Phase` and collapse toggle logic.
Details: Insert new phases before Backlog and toggle `collapsedPhases` per column with `data-collapsed` marker.
Step 4: Run tests (expect pass).
`npm test`
Step 5: Commit.
`git commit -m "feat(p1): add phase creation and collapse"`

- [ ] T5: Visual verification.
Files: app/page.tsx
Step 1: Run the app and visually verify drag handles, collapse states, and column widths.
`npm run dev`
Step 2: Confirm the layout matches schafolding.tsx for spacing, colors, and typography.
Step 3: Commit any visual tweaks.
`git commit -m "chore(p1): polish step 4 visuals"`
