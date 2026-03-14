import { render, screen, fireEvent } from "@testing-library/react";
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
      effectAllowed: "move",
      dropEffect: "move",
    };
    fireEvent.dragStart(card, { dataTransfer });
    fireEvent.dragOver(target, { dataTransfer });
    fireEvent.drop(target, { dataTransfer });
    expect(screen.getByTestId("phase-Phase 2")).toHaveTextContent("Billing");
  });
});

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
