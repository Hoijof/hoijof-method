import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home, { parseState, serializeState } from "../app/page";

describe("Phase 2 persistence helpers", () => {
  it("serializes and parses a valid state", () => {
    const state = {
      version: 1,
      currentStep: 2,
      appData: {
        name: "Test",
        pitch: "Pitch",
        audience: "Audience",
        monetization: "Freemium",
      },
      selectedStack: "next-supabase",
      features: [
        {
          id: "1",
          text: "Billing",
          priority: 2,
          phase: "Pool",
        },
      ],
      dynamicPhases: ["MVP", "Phase 2", "Backlog"],
      collapsedPhases: { MVP: true },
      inlineInputs: { MVP: "Test" },
    };

    const serialized = serializeState(state);
    const parsed = parseState(serialized);
    expect(parsed).toEqual(state);
  });
});

describe("Phase 2 persistence integration", () => {
  const storage: Record<string, string> = {};
  const originalStorage = global.localStorage;

  beforeEach(() => {
    Object.keys(storage).forEach((key) => delete storage[key]);
    Object.defineProperty(global, "localStorage", {
      value: {
        getItem: (key: string) => storage[key] ?? null,
        setItem: (key: string, value: string) => {
          storage[key] = value;
        },
        removeItem: (key: string) => {
          delete storage[key];
        },
      },
      configurable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(global, "localStorage", {
      value: originalStorage,
      configurable: true,
    });
  });

  it("hydrates state from localStorage on load", async () => {
    const user = userEvent.setup();
    const saved = serializeState({
      version: 1,
      currentStep: 3,
      appData: {
        name: "Persisted",
        pitch: "Saved pitch",
        audience: "",
        monetization: "",
      },
      selectedStack: "",
      features: [],
      dynamicPhases: ["MVP", "Phase 2", "Backlog"],
      collapsedPhases: {},
      inlineInputs: {},
    });
    storage["hoijof.appbuilder.state.v1"] = saved;

    render(<Home />);
    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: /Feature Brainstorm/i })
      ).toBeInTheDocument()
    );
    await user.click(screen.getByRole("button", { name: /Back/i }));
    await user.click(screen.getByRole("button", { name: /Back/i }));
    expect(screen.getByLabelText(/App Name/i)).toHaveValue("Persisted");
  });

  it("resets state and clears storage", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.type(screen.getByLabelText(/App Name/i), "Temp");
    await user.click(screen.getByRole("button", { name: /Reset Wizard/i }));
    expect(screen.getByLabelText(/App Name/i)).toHaveValue("");
    expect(storage["hoijof.appbuilder.state.v1"]).toBeUndefined();
  });
});
