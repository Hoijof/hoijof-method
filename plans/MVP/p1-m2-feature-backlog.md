# P1-M2 Feature Backlog Implementation Plan

**Status:** NOT STARTED

## Prerequisites
- Design doc approved: p1-m2-feature-backlog-design.md

## Tasks
- [ ] T1: Implement Step 3 layout, feature input, and list rendering.
Files: app/page.tsx, __tests__/wizard-step3.test.tsx
Step 1: Write the failing tests.
```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../app/page";

describe("Step 3 feature backlog", () => {
  it("adds a feature to the list", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    const input = screen.getByPlaceholderText(/Type a feature/i);
    await user.type(input, "User Authentication");
    await user.keyboard("{enter}");
    expect(screen.getByText("User Authentication")).toBeInTheDocument();
  });
});
```
Step 2: Run tests (expect failure: Step 3 UI not present).
`npm test`
Step 3: Implement Step 3 UI and state.
Details: Add `features` and `newFeature` state, render the Step 3 section aligned to schafolding.tsx, and wire the input to add items on submit.
Step 4: Run tests (expect pass).
`npm test`
Step 5: Commit.
`git commit -m "feat(p1): add step 3 feature input and list"`

- [ ] T2: Implement priority selection (P1/P2/P3).
Files: app/page.tsx, __tests__/wizard-step3.test.tsx
Step 1: Write the failing tests.
```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../app/page";

describe("Step 3 priority selection", () => {
  it("defaults new features to P2 and allows changing priority", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    const input = screen.getByPlaceholderText(/Type a feature/i);
    await user.type(input, "Billing & Subscriptions");
    await user.keyboard("{enter}");
    const select = screen.getByLabelText(/Priority for Billing & Subscriptions/i);
    expect(select).toHaveValue("2");
    await user.selectOptions(select, "1");
    expect(select).toHaveValue("1");
  });
});
```
Step 2: Run tests (expect failure: priority control missing).
`npm test`
Step 3: Implement priority dropdowns for each feature.
Details: Render a select per item with `P1`, `P2`, `P3` options and add an accessible label for test targeting.
Step 4: Run tests (expect pass).
`npm test`
Step 5: Commit.
`git commit -m "feat(p1): add step 3 priority controls"`

- [ ] T3: Implement delete and empty-state behaviors.
Files: app/page.tsx, __tests__/wizard-step3.test.tsx
Step 1: Write the failing tests.
```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../app/page";

describe("Step 3 delete and empty state", () => {
  it("deletes a feature from the list", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    const input = screen.getByPlaceholderText(/Type a feature/i);
    await user.type(input, "Dashboard");
    await user.keyboard("{enter}");
    await user.click(screen.getByRole("button", { name: /Delete Dashboard/i }));
    expect(screen.queryByText("Dashboard")).not.toBeInTheDocument();
  });

  it("shows an empty state when there are no features", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    expect(
      screen.getByText(/Your feature list is empty/i)
    ).toBeInTheDocument();
  });
});
```
Step 2: Run tests (expect failure: delete and empty state missing).
`npm test`
Step 3: Implement delete buttons and empty state.
Details: Add delete buttons with unique `aria-label` per feature and render empty-state when list length is zero.
Step 4: Run tests (expect pass).
`npm test`
Step 5: Commit.
`git commit -m "feat(p1): add step 3 delete and empty state"`

- [ ] T4: Visual verification.
Files: app/page.tsx
Step 1: Run the app and visually verify Step 3 spacing, list, and controls.
`npm run dev`
Step 2: Confirm layout matches schafolding.tsx for padding, colors, and typography.
Step 3: Commit any visual tweaks.
`git commit -m "chore(p1): polish step 3 visuals"`
