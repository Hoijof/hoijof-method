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
    expect(
      screen.getByRole("button", { name: /Enhance Pitch/i })
    ).toBeDisabled();
  });
});
