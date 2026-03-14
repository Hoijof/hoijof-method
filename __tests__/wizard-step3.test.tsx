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

  it("defaults new features to P2 and allows changing priority", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    const input = screen.getByPlaceholderText(/Type a feature/i);
    await user.type(input, "Billing & Subscriptions");
    await user.keyboard("{enter}");
    const select = screen.getByLabelText(
      /Priority for Billing & Subscriptions/i
    );
    expect(select).toHaveValue("2");
    await user.selectOptions(select, "1");
    expect(select).toHaveValue("1");
  });

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
