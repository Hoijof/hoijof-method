# P1-M4 Export System Implementation Plan

**Status:** NOT STARTED

## Prerequisites
- Design doc approved: p1-m4-export-system-design.md

## Tasks
- [ ] T1: Build PRD markdown generator.
Files: app/page.tsx, __tests__/wizard-step5.test.tsx
Step 1: Write the failing tests.
```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../app/page";

describe("Step 5 PRD generator", () => {
  it("includes app name and pitch in PRD output", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.type(screen.getByLabelText(/App Name/i), "Hoijof Builder");
    await user.type(
      screen.getByLabelText(/Elevator Pitch/i),
      "A wizard for structured planning."
    );
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    const prd = screen.getByTestId("prd-preview");
    expect(prd).toHaveTextContent("Hoijof Builder");
    expect(prd).toHaveTextContent("A wizard for structured planning.");
  });
});
```
Step 2: Run tests (expect failure: Step 5 UI not present).
`npm test`
Step 3: Implement `generatePRD` and the PRD preview.
Details: Add generator function that uses `appData`, `selectedStack`, and `features`.
Step 4: Run tests (expect pass).
`npm test`
Step 5: Commit.
`git commit -m "feat(p1): add PRD generator and preview"`

- [ ] T2: Build phase roadmap generator.
Files: app/page.tsx, __tests__/wizard-step5.test.tsx
Step 1: Write the failing tests.
```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../app/page";

describe("Step 5 phase roadmap generator", () => {
  it("includes MVP tasks sorted by priority", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    const input = screen.getByPlaceholderText(/Type a feature/i);
    await user.type(input, "Payment");
    await user.keyboard("{enter}");
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    const inline = screen.getByPlaceholderText(/Add to MVP/i);
    await user.type(inline, "Onboarding");
    await user.keyboard("{enter}");
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    const roadmap = screen.getByTestId("phase-preview-MVP");
    expect(roadmap).toHaveTextContent("Onboarding");
  });
});
```
Step 2: Run tests (expect failure: phase previews missing).
`npm test`
Step 3: Implement `generatePhaseMarkdown` and phase preview cards.
Details: Use `dynamicPhases` to render previews and skip Backlog.
Step 4: Run tests (expect pass).
`npm test`
Step 5: Commit.
`git commit -m "feat(p1): add phase roadmap generator and previews"`

- [ ] T3: Implement JSZip bundling and download flow.
Files: app/page.tsx, __tests__/wizard-step5.test.tsx
Step 1: Write the failing tests.
```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../app/page";

describe("Step 5 zip export", () => {
  it("disables export button while zipping", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    const exportButton = screen.getByRole("button", {
      name: /Download All as ZIP/i,
    });
    await user.click(exportButton);
    expect(exportButton).toBeDisabled();
  });
});
```
Step 2: Run tests (expect failure: export button missing).
`npm test`
Step 3: Implement JSZip export.
Details: Use `import("jszip")`, create PRD + phase files, then trigger download with a blob URL.
Step 4: Run tests (expect pass).
`npm test`
Step 5: Commit.
`git commit -m "feat(p1): add jszip export for docs"`

- [ ] T4: Visual verification.
Files: app/page.tsx
Step 1: Run the app and visually verify export previews and CTA.
`npm run dev`
Step 2: Confirm the layout matches schafolding.tsx for spacing, colors, and typography.
Step 3: Commit any visual tweaks.
`git commit -m "chore(p1): polish step 5 visuals"`
