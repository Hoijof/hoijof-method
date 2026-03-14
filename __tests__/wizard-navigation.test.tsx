import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../app/page";

describe("Wizard navigation", () => {
  it("moves forward and back between steps", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    expect(
      screen.getByRole("heading", { name: /Technical Foundation/i })
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Back/i }));
    expect(
      screen.getByRole("heading", { name: /Project Foundation/i })
    ).toBeInTheDocument();
  });
});
