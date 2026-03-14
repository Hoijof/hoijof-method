import { render, screen } from "@testing-library/react";
import Home from "../app/page";

describe("Wizard shell", () => {
  it("renders the wizard header and first step", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /Hoijof Builder/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Project Foundation/i })
    ).toBeInTheDocument();
  });

  it("shows 5 steps in the stepper", () => {
    render(<Home />);
    const stepper = screen.getByTestId("wizard-stepper");
    expect(stepper.querySelectorAll("[data-step]").length).toBe(5);
  });
});
