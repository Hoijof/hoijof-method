# P1-M1 Wizard Framework Implementation Plan

**Status:** NOT STARTED

## Prerequisites
- Design doc approved: p1-m1-wizard-framework-design.md

## Tasks
- [ ] T0: Add a component test harness (Jest + React Testing Library).
Files: package.json, jest.config.js, jest.setup.ts, __tests__/wizard-shell.test.tsx
Step 1: Write the failing test.
```tsx
import { render, screen } from "@testing-library/react";
import Home from "../app/page";

describe("Wizard shell", () => {
  it("renders the wizard header and first step", () => {
    render(<Home />);
    expect(screen.getByText("Hoijof App Builder")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Project Foundation/i })).toBeInTheDocument();
  });
});
```
Step 2: Run tests (expect failure due to missing test config).
`npm test`
Step 3: Add Jest + RTL config and script.
Details: Add `test` script to package.json. Add `jest.config.js` using `next/jest` with `testEnvironment: "jsdom"`. Add `jest.setup.ts` importing `@testing-library/jest-dom`.
Step 4: Re-run tests (expect failure due to missing wizard UI).
`npm test`
Step 5: Commit.
`git commit -m "test(p1): add jest + rtl harness for wizard"`

- [ ] T1: Implement wizard shell and stepper layout.
Files: app/page.tsx, app/globals.css
Step 1: Write the failing tests for the shell and stepper.
```tsx
import { render, screen } from "@testing-library/react";
import Home from "../app/page";

describe("Wizard shell", () => {
  it("shows 5 steps in the stepper", () => {
    render(<Home />);
    const stepper = screen.getByTestId("wizard-stepper");
    expect(stepper.querySelectorAll("[data-step]").length).toBe(5);
  });
});
```
Step 2: Run tests (expect failure: stepper not present).
`npm test`
Step 3: Implement the header, stepper, and card container aligned to schafolding.tsx.
Details: Add `use client` at the top of `app/page.tsx`. Replace the Next starter layout with the wizard shell. Add `data-testid="wizard-stepper"` and `data-step` markers for step nodes.
Step 4: Run tests (expect pass).
`npm test`
Step 5: Commit.
`git commit -m "feat(p1): scaffold wizard shell and stepper"`

- [ ] T2: Implement step navigation (Back/Next).
Files: app/page.tsx, __tests__/wizard-navigation.test.tsx
Step 1: Write the failing tests.
```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../app/page";

describe("Wizard navigation", () => {
  it("moves forward and back between steps", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    expect(screen.getByRole("heading", { name: /Technical Foundation/i })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Back/i }));
    expect(screen.getByRole("heading", { name: /Project Foundation/i })).toBeInTheDocument();
  });
});
```
Step 2: Run tests (expect failure: buttons or headings missing).
`npm test`
Step 3: Implement navigation state and button disabled states.
Details: Add `currentStep` state and step definitions. Show the correct step content based on `currentStep`. Disable Back on step 1.
Step 4: Run tests (expect pass).
`npm test`
Step 5: Commit.
`git commit -m "feat(p1): add wizard step navigation"`

- [ ] T3: Implement Step 1 (Project Foundation) form fields.
Files: app/page.tsx, __tests__/wizard-step1.test.tsx
Step 1: Write the failing tests.
```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../app/page";

describe("Step 1 form", () => {
  it("updates App Name input", async () => {
    const user = userEvent.setup();
    render(<Home />);
    const input = screen.getByLabelText(/App Name/i);
    await user.type(input, "Hoijof Builder");
    expect(input).toHaveValue("Hoijof Builder");
  });

  it("disables Enhance Pitch when pitch is empty", () => {
    render(<Home />);
    expect(screen.getByRole("button", { name: /Enhance Pitch/i })).toBeDisabled();
  });
});
```
Step 2: Run tests (expect failure: inputs not present).
`npm test`
Step 3: Implement Step 1 UI and controlled state.
Details: Add `appData` state and wire `name`, `audience`, `monetization`, and `pitch` inputs. Ensure labels match the test selectors. Keep the Enhance Pitch button disabled until pitch has content.
Step 4: Run tests (expect pass).
`npm test`
Step 5: Commit.
`git commit -m "feat(p1): add step 1 project foundation form"`

- [ ] T4: Implement Step 2 (Tech Stack Presets) selection UI.
Files: app/page.tsx, __tests__/wizard-step2.test.tsx
Step 1: Write the failing tests.
```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../app/page";

describe("Step 2 stack selection", () => {
  it("selects a stack preset", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    const stack = screen.getByRole("button", { name: /Next\\.js \\+ Supabase/i });
    await user.click(stack);
    expect(stack).toHaveAttribute("aria-pressed", "true");
  });
});
```
Step 2: Run tests (expect failure: stack buttons not present).
`npm test`
Step 3: Implement the curated stack grid.
Details: Add `STACK_PRESETS` and `selectedStack` state. Render presets as buttons with `aria-pressed` for selected state.
Step 4: Run tests (expect pass).
`npm test`
Step 5: Commit.
`git commit -m "feat(p1): add step 2 stack preset selection"`

- [ ] T5: Visual verification.
Files: app/page.tsx
Step 1: Run the app and visually verify stepper, layout, and Step 1/2 forms.
`npm run dev`
Step 2: Confirm the layout matches schafolding.tsx for spacing, colors, and typography.
Step 3: Commit any visual tweaks.
`git commit -m "chore(p1): polish wizard visuals"`
