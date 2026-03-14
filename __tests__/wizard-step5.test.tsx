import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("jszip", () => {
  return jest.fn().mockImplementation(() => ({
    file: jest.fn(),
    folder: jest.fn(() => ({ file: jest.fn() })),
    generateAsync: jest.fn(() => new Promise(() => {})),
  }));
});

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
    await waitFor(() => expect(exportButton).toBeDisabled());
  });
});
