import { render, screen } from "@testing-library/react";
import Home from "../app/page";

describe("Phase 2 ads", () => {
  it("renders the banner and inline ad slots", () => {
    render(<Home />);
    expect(screen.getByTestId("ad-slot-banner")).toBeInTheDocument();
    expect(screen.getByTestId("ad-slot-inline")).toBeInTheDocument();
  });
});
