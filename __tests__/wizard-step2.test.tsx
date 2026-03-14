import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../app/page";

describe("Step 2 stack selection", () => {
  it("selects a stack preset", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    const stack = screen.getByRole("button", { name: /Next\.js \+ Supabase/i });
    await user.click(stack);
    expect(stack).toHaveAttribute("aria-pressed", "true");
  });
});
