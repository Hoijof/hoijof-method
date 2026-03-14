import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../app/page";

const mockFetchWithText = (text: string) =>
  jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      candidates: [{ content: { parts: [{ text }] } }],
    }),
  });

describe("Phase 2 Gemini actions", () => {
  it("updates the pitch with Gemini response", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.type(screen.getByLabelText(/Gemini API Key/i), "test-key");
    await user.type(
      screen.getByLabelText(/Elevator Pitch/i),
      "Original pitch"
    );
    global.fetch = mockFetchWithText("Improved pitch") as unknown as typeof fetch;

    await user.click(
      screen.getByRole("button", { name: /Enhance Pitch with AI/i })
    );

    await waitFor(() =>
      expect(screen.getByLabelText(/Elevator Pitch/i)).toHaveValue(
        "Improved pitch"
      )
    );
  });

  it("selects a stack preset based on Gemini response", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.type(screen.getByLabelText(/Gemini API Key/i), "test-key");
    global.fetch = mockFetchWithText("Next.js + Supabase") as unknown as typeof fetch;

    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    await user.click(
      screen.getByRole("button", { name: /Auto-Suggest Best Fit/i })
    );

    const stackButton = screen.getByRole("button", {
      name: /Next\.js \+ Supabase/i,
    });
    await waitFor(() =>
      expect(stackButton).toHaveAttribute("aria-pressed", "true")
    );
  });

  it("adds suggested features to the backlog", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.type(screen.getByLabelText(/Gemini API Key/i), "test-key");
    global.fetch = mockFetchWithText(
      "User Authentication\nBilling & Subscriptions"
    ) as unknown as typeof fetch;

    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    await user.click(
      screen.getByRole("button", { name: /Suggest Missing Core Features/i })
    );

    expect(screen.getByText("User Authentication")).toBeInTheDocument();
    expect(screen.getByText("Billing & Subscriptions")).toBeInTheDocument();
  });

  it("auto-triages pool items into phases", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.type(screen.getByLabelText(/Gemini API Key/i), "test-key");

    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    const input = screen.getByPlaceholderText(/Type a feature/i);
    await user.type(input, "Billing");
    await user.keyboard("{enter}");

    global.fetch = mockFetchWithText(
      JSON.stringify({
        MVP: [],
        "Phase 2": ["Billing"],
        Backlog: [],
      })
    ) as unknown as typeof fetch;

    await user.click(screen.getByRole("button", { name: /Next Step/i }));
    await user.click(
      screen.getByRole("button", { name: /Auto-Triage Remaining/i })
    );

    await waitFor(() =>
      expect(screen.getByTestId("phase-Phase 2")).toHaveTextContent("Billing")
    );
  });
});
