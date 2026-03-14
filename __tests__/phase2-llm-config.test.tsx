import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../app/page";

describe("Phase 2 Gemini config", () => {
  it("captures API key input", async () => {
    const user = userEvent.setup();
    render(<Home />);
    const input = screen.getByLabelText(/Gemini API Key/i);
    await user.type(input, "test-key");
    expect(input).toHaveValue("test-key");
  });

  it("defaults the model to gemini-2.5-flash", () => {
    render(<Home />);
    const model = screen.getByLabelText(/Gemini Model/i);
    expect(model).toHaveValue("gemini-2.5-flash");
  });
});
