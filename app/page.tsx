"use client";

import {
  useEffect,
  useRef,
  useState,
  type DragEvent,
  type FormEvent,
} from "react";
import JSZip from "jszip";

type WizardStep = {
  id: number;
  title: string;
};

type AppData = {
  name: string;
  pitch: string;
  audience: string;
  monetization: string;
};

type StackPreset = {
  id: string;
  name: string;
  desc: string;
};

type FeatureItem = {
  id: string;
  text: string;
  priority: 1 | 2 | 3;
  phase: string;
};

type AiAction = "pitch" | "stack" | "features" | "triage";
type AiStatus = "idle" | "loading" | "error";
type AiStatusMap = Record<AiAction, AiStatus>;

type PersistedStateV1 = {
  version: 1;
  currentStep: number;
  appData: AppData;
  selectedStack: string;
  features: FeatureItem[];
  dynamicPhases: string[];
  collapsedPhases: Record<string, boolean>;
  inlineInputs: Record<string, string>;
};

type AdSlotConfig = {
  id: string;
  label: string;
  size: string;
  placement: "banner" | "inline";
};

const STORAGE_KEY = "hoijof.appbuilder.state.v1";

const ADS_ENABLED = true;
const AD_SLOTS: AdSlotConfig[] = [
  { id: "banner", label: "Sponsored", size: "728x90", placement: "banner" },
  { id: "inline", label: "Sponsored", size: "160x600", placement: "inline" },
];

const STEPS: WizardStep[] = [
  { id: 1, title: "Project Foundation" },
  { id: 2, title: "Technical Constraints" },
  { id: 3, title: "Feature Brainstorm" },
  { id: 4, title: "Hoijof Phasing" },
  { id: 5, title: "Export Docs" },
];

const STACK_PRESETS: StackPreset[] = [
  {
    id: "next-supabase",
    name: "Next.js + Supabase",
    desc: "Next.js, Tailwind, Supabase (Auth/DB), Vercel. Best for modern SaaS.",
  },
  {
    id: "t3",
    name: "T3 Stack",
    desc: "Next.js, Tailwind, tRPC, Prisma. Best for type-safe scalability.",
  },
  {
    id: "firebase-react",
    name: "React + Firebase",
    desc: "React (Vite), Tailwind, Firebase. Best for rapid MVP and realtime apps.",
  },
  {
    id: "mern",
    name: "MERN Stack",
    desc: "MongoDB, Express, React, Node.js. Best for custom backend logic.",
  },
  {
    id: "django",
    name: "Django + HTMX",
    desc: "Django (Python), Postgres, HTMX, Tailwind. Best for data-heavy apps.",
  },
  {
    id: "decide-later",
    name: "I'll decide later",
    desc: "Skip this step for now and figure out the architecture during the coding phase.",
  },
];

const getStackInfo = (selectedStack: string) =>
  STACK_PRESETS.find((stack) => stack.id === selectedStack)?.desc ||
  "To be determined";

export const runGemini = async ({
  apiKey,
  model,
  prompt,
}: {
  apiKey: string;
  model: string;
  prompt: string;
}) => {
  if (!apiKey.trim()) {
    throw new Error("Missing Gemini API key.");
  }
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
      model
    )}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = (await response.json()) as {
    candidates?: Array<{
      content?: { parts?: Array<{ text?: string }> };
    }>;
  };
  const text =
    data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text)
      .filter(Boolean)
      .join("") || "";

  if (!text) {
    throw new Error("Gemini API returned no text.");
  }

  return text;
};

export const serializeState = (state: PersistedStateV1) =>
  JSON.stringify(state);

export const parseState = (raw: string | null) => {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<PersistedStateV1>;
    if (parsed.version !== 1) return null;
    if (!parsed.appData || typeof parsed.appData !== "object") return null;
    if (!Array.isArray(parsed.dynamicPhases)) return null;
    if (!Array.isArray(parsed.features)) return null;
    return parsed as PersistedStateV1;
  } catch (error) {
    return null;
  }
};

const AdSlot = ({ slot }: { slot: AdSlotConfig }) => (
  <div
    data-testid={`ad-slot-${slot.id}`}
    data-ad-slot={slot.id}
    data-ad-placement={slot.placement}
    aria-label="Advertisement"
    className={`w-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-5 text-center text-slate-400 ${
      slot.placement === "inline"
        ? "min-h-[600px] h-[calc(100vh-8rem)] flex flex-col justify-center"
        : ""
    }`}
  >
    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
      {slot.label}
    </div>
    <div className="mt-2 text-sm">
      Ad Slot {slot.id} ({slot.size})
    </div>
  </div>
);

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [appData, setAppData] = useState<AppData>({
    name: "",
    pitch: "",
    audience: "",
    monetization: "",
  });
  const [selectedStack, setSelectedStack] = useState("");
  const [features, setFeatures] = useState<FeatureItem[]>([]);
  const [newFeature, setNewFeature] = useState("");
  const [geminiApiKey, setGeminiApiKey] = useState("");
  const [geminiModel, setGeminiModel] = useState("gemini-2.5-flash");
  const [aiStatus, setAiStatus] = useState<AiStatusMap>({
    pitch: "idle",
    stack: "idle",
    features: "idle",
    triage: "idle",
  });
  const [aiError, setAiError] = useState<string | null>(null);
  const [dynamicPhases, setDynamicPhases] = useState([
    "MVP",
    "Phase 2",
    "Backlog",
  ]);
  const [inlineInputs, setInlineInputs] = useState<Record<string, string>>({});
  const [collapsedPhases, setCollapsedPhases] = useState<
    Record<string, boolean>
  >({});
  const dragItemId = useRef<string | null>(null);
  const [isZipping, setIsZipping] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const parsed = parseState(localStorage.getItem(STORAGE_KEY));
    if (!parsed) return;
    setCurrentStep(parsed.currentStep);
    setAppData(parsed.appData);
    setSelectedStack(parsed.selectedStack);
    setFeatures(parsed.features);
    setDynamicPhases(parsed.dynamicPhases);
    setCollapsedPhases(parsed.collapsedPhases);
    setInlineInputs(parsed.inlineInputs);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const timeout = window.setTimeout(() => {
      const payload: PersistedStateV1 = {
        version: 1,
        currentStep,
        appData,
        selectedStack,
        features,
        dynamicPhases,
        collapsedPhases,
        inlineInputs,
      };
      localStorage.setItem(STORAGE_KEY, serializeState(payload));
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [
    currentStep,
    appData,
    selectedStack,
    features,
    dynamicPhases,
    collapsedPhases,
    inlineInputs,
  ]);

  const goNext = () =>
    setCurrentStep((step) => Math.min(step + 1, STEPS.length));
  const goBack = () => setCurrentStep((step) => Math.max(step - 1, 1));

  const handleAddFeature = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = newFeature.trim();
    if (!trimmed) return;
    setFeatures((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${prev.length}`,
        text: trimmed,
        priority: 2,
        phase: "Pool",
      },
    ]);
    setNewFeature("");
  };

  const handlePriorityChange = (id: string, priority: 1 | 2 | 3) => {
    setFeatures((prev) =>
      prev.map((feature) =>
        feature.id === id ? { ...feature, priority } : feature
      )
    );
  };

  const handleRemoveFeature = (id: string) => {
    setFeatures((prev) => prev.filter((feature) => feature.id !== id));
  };

  const handleInlineAdd = (event: FormEvent<HTMLFormElement>, phase: string) => {
    event.preventDefault();
    const value = inlineInputs[phase]?.trim();
    if (!value) return;
    setFeatures((prev) => [
      ...prev,
      { id: `${Date.now()}-${prev.length}`, text: value, priority: 2, phase },
    ]);
    setInlineInputs((prev) => ({ ...prev, [phase]: "" }));
  };

  const handleAddPhase = () => {
    const phaseCount = dynamicPhases.filter((phase) =>
      phase.startsWith("Phase")
    ).length;
    const newPhase = `Phase ${phaseCount + 2}`;
    const backlogIndex = dynamicPhases.indexOf("Backlog");
    const nextPhases = [...dynamicPhases];
    nextPhases.splice(
      backlogIndex === -1 ? nextPhases.length : backlogIndex,
      0,
      newPhase
    );
    setDynamicPhases(nextPhases);
  };

  const togglePhaseCollapse = (phase: string) => {
    setCollapsedPhases((prev) => ({ ...prev, [phase]: !prev[phase] }));
  };

  const handleDragStart = (id: string, event: DragEvent<HTMLDivElement>) => {
    dragItemId.current = id;
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>, targetPhase: string) => {
    event.preventDefault();
    const draggedId = dragItemId.current;
    if (!draggedId) return;
    setFeatures((prev) =>
      prev.map((feature) =>
        feature.id === draggedId ? { ...feature, phase: targetPhase } : feature
      )
    );
    dragItemId.current = null;
  };

  const setActionStatus = (action: AiAction, status: AiStatus) => {
    setAiStatus((prev) => ({ ...prev, [action]: status }));
  };

  const runGeminiAction = async (
    action: AiAction,
    prompt: string,
    onSuccess: (text: string) => void
  ) => {
    setActionStatus(action, "loading");
    setAiError(null);
    try {
      const text = await runGemini({
        apiKey: geminiApiKey,
        model: geminiModel,
        prompt,
      });
      onSuccess(text);
      setActionStatus(action, "idle");
    } catch (error) {
      setActionStatus(action, "error");
      setAiError(
        error instanceof Error ? error.message : "Gemini request failed."
      );
    }
  };

  const retryLastAction = () => {
    setAiError(null);
    setAiStatus({
      pitch: "idle",
      stack: "idle",
      features: "idle",
      triage: "idle",
    });
  };

  const resetWizard = () => {
    setCurrentStep(1);
    setAppData({
      name: "",
      pitch: "",
      audience: "",
      monetization: "",
    });
    setSelectedStack("");
    setFeatures([]);
    setNewFeature("");
    setDynamicPhases(["MVP", "Phase 2", "Backlog"]);
    setCollapsedPhases({});
    setInlineInputs({});
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const parseSuggestionList = (text: string) =>
    text
      .split(/\r?\n|,/)
      .map((line) =>
        line
          .replace(/^\s*[-*\d.\)\]]+\s*/, "")
          .replace(/^\s*-\s*/, "")
          .trim()
      )
      .filter(Boolean);

  const handleEnhancePitchAI = async () => {
    if (!appData.pitch.trim()) return;
    const prompt = `Improve the following elevator pitch in 1-2 sentences. Return only the improved pitch text.\n\nPitch: ${appData.pitch}\nAudience: ${appData.audience || "N/A"}`;
    await runGeminiAction("pitch", prompt, (text) => {
      const trimmed = text.trim();
      if (!trimmed) {
        throw new Error("Gemini returned an empty pitch.");
      }
      setAppData((prev) => ({ ...prev, pitch: trimmed }));
    });
  };

  const handleSuggestStackAI = async () => {
    const stackList = STACK_PRESETS.map(
      (stack) => `- ${stack.id}: ${stack.name} (${stack.desc})`
    ).join("\n");
    const prompt = `Choose the best stack id from the list below based on the project description. Return only the stack id.\n\nProject: ${
      appData.name || "Untitled"
    }\nPitch: ${appData.pitch || "N/A"}\nAudience: ${
      appData.audience || "N/A"
    }\n\nStacks:\n${stackList}`;
    await runGeminiAction("stack", prompt, (text) => {
      const normalized = text.toLowerCase();
      const match = STACK_PRESETS.find(
        (stack) =>
          normalized.includes(stack.id.toLowerCase()) ||
          normalized.includes(stack.name.toLowerCase())
      );
      if (!match) {
        throw new Error("Gemini response did not match any stack.");
      }
      setSelectedStack(match.id);
    });
  };

  const handleSuggestFeaturesAI = async () => {
    const prompt = `Suggest 3-5 missing core features for the app. Return a plain list, one feature per line, no numbering.\n\nProject: ${
      appData.name || "Untitled"
    }\nPitch: ${appData.pitch || "N/A"}`;
    await runGeminiAction("features", prompt, (text) => {
      const suggestions = parseSuggestionList(text);
      if (suggestions.length === 0) {
        throw new Error("Gemini returned no feature suggestions.");
      }
      setFeatures((prev) => {
        const existing = new Set(prev.map((feature) => feature.text.toLowerCase()));
        const additions = suggestions
          .filter((suggestion) => !existing.has(suggestion.toLowerCase()))
          .map((suggestion, index) => ({
            id: `${Date.now()}-${prev.length + index}`,
            text: suggestion,
            priority: 2 as const,
            phase: "Pool",
          }));
        return [...prev, ...additions];
      });
    });
  };

  const normalizePhaseName = (phase: string) => {
    const lower = phase.toLowerCase();
    if (lower === "mvp") return "MVP";
    if (lower === "phase 2" || lower === "phase2") return "Phase 2";
    if (lower === "backlog") return "Backlog";
    const match = dynamicPhases.find(
      (dynamic) => dynamic.toLowerCase() === lower
    );
    return match || null;
  };

  const handleAutoTriageAI = async () => {
    const poolFeatures = features.filter((feature) => feature.phase === "Pool");
    if (poolFeatures.length === 0) return;
    const featureList = poolFeatures.map((feature) => `- ${feature.text}`).join("\n");
    const prompt = `Assign each feature to MVP, Phase 2, or Backlog. Return JSON with keys "MVP", "Phase 2", and "Backlog", each an array of feature names.\n\nFeatures:\n${featureList}`;
    await runGeminiAction("triage", prompt, (text) => {
      let parsed: unknown;
      try {
        parsed = JSON.parse(text);
      } catch (error) {
        throw new Error("Gemini returned invalid JSON for triage.");
      }
      if (!parsed || typeof parsed !== "object") {
        throw new Error("Gemini returned invalid triage data.");
      }
      const assignments = new Map<string, string>();
      Object.entries(parsed as Record<string, unknown>).forEach(
        ([phase, items]) => {
          const normalized = normalizePhaseName(phase);
          if (!normalized || !Array.isArray(items)) return;
          items.forEach((item) => {
            if (typeof item !== "string") return;
            assignments.set(item.toLowerCase(), normalized);
          });
        }
      );
      if (assignments.size === 0) {
        throw new Error("Gemini returned no triage assignments.");
      }
      setFeatures((prev) =>
        prev.map((feature) => {
          const assigned = assignments.get(feature.text.toLowerCase());
          return assigned ? { ...feature, phase: assigned } : feature;
        })
      );
    });
  };

  const generatePRD = () => {
    const sortedFeatures = (phase: string) =>
      features
        .filter((feature) => feature.phase === phase)
        .sort((a, b) => a.priority - b.priority);

    return `# Product Requirements Document (PRD)

## 1. Project Overview
**Product Name:** ${appData.name || "[App Name]"}
**Elevator Pitch:** ${appData.pitch || "[No pitch provided]"}

## 2. Target Market & Business Model
**Target Audience:** ${appData.audience || "[No audience provided]"}
**Monetization Strategy:** ${appData.monetization || "[No strategy selected]"}

## 3. Technical Architecture
**Recommended Stack:** ${getStackInfo(selectedStack)}

## 4. Product Scope & Phasing
This project follows the strict Hoijof phased methodology.

### Phase 1: Minimum Viable Product (MVP)
*Goal: Validate core assumptions with minimal engineering effort.*
${
  sortedFeatures("MVP").length
    ? sortedFeatures("MVP")
        .map((feature) => `- (P${feature.priority}) ${feature.text}`)
        .join("\n")
    : "- No features defined."
}

${dynamicPhases
  .filter((phase) => phase !== "MVP" && phase !== "Backlog")
  .map(
    (phase) => `### ${phase}
${
  sortedFeatures(phase).length
    ? sortedFeatures(phase)
        .map((feature) => `- (P${feature.priority}) ${feature.text}`)
        .join("\n")
    : "- No features defined."
}`
  )
  .join("\n")}

### Backlog / Future Moonshots
${
  sortedFeatures("Backlog").length
    ? sortedFeatures("Backlog")
        .map((feature) => `- (P${feature.priority}) ${feature.text}`)
        .join("\n")
    : "- No backlog items."
}

---
*Generated via Hoijof Builder on ${new Date()
      .toISOString()
      .split("T")[0]}*`;
  };

  const generatePhaseMarkdown = (phase: string) => {
    const phaseFeatures = features
      .filter((feature) => feature.phase === phase)
      .sort((a, b) => a.priority - b.priority);

    return `# ${phase} Phase Roadmap

## Goal & Status
**Goal:** Implement core functionalities for the ${phase} milestone of ${
      appData.name || "the application"
    }.
**Status:** 🔴 NOT STARTED

## Task Tracking
### Priorities
${
  phaseFeatures.length
    ? phaseFeatures
        .map((feature) => `- [ ] P${feature.priority}: ${feature.text}`)
        .join("\n")
    : "- [ ] P1: No features assigned yet."
}

## Tech Stack
- **Architecture:** ${getStackInfo(selectedStack)}

## Memory Log (Append-Only)
- **[${new Date().toISOString().split("T")[0]}]**: Phase initialized. Ready for technical design documentation.`;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      window.alert("Copied to clipboard!");
    } catch (error) {
      console.error("Clipboard copy failed", error);
    }
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();
      zip.file("PRD.md", generatePRD());

      dynamicPhases.forEach((phase) => {
        if (phase === "Backlog") return;
        const folderName = phase.replace(/\s+/g, "");
        const fileName = `${phase.toLowerCase().replace(/\s+/g, "-")}-roadmap.md`;
        zip.folder(`plans/${folderName}`)?.file(fileName, generatePhaseMarkdown(phase));
      });

      try {
        const content = await zip.generateAsync({ type: "blob" });
        if (typeof URL === "undefined" || !URL.createObjectURL) return;
        const url = URL.createObjectURL(content);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${
          appData.name
            ? appData.name.replace(/\s+/g, "-").toLowerCase()
            : "hoijof-project"
        }-plans.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Failed to zip:", error);
      }
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo-mark.svg"
              alt="Hoijof"
              className="w-8 h-8"
            />
            <h1 className="font-extrabold text-lg tracking-tight text-slate-900">
              Hoijof{" "}
              <span className="font-light text-indigo-600">Builder</span>
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-8">
        <div className="flex items-start gap-6">
          <div className="flex-1 min-w-0">
            {ADS_ENABLED && (
              <div className="mb-6">
                <AdSlot slot={AD_SLOTS[0]} />
              </div>
            )}
            <div
              className="flex items-center justify-between mb-10 relative max-w-4xl mx-auto"
              data-testid="wizard-stepper"
            >
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 -z-10 rounded-full"></div>
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-indigo-600 -z-10 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
              ></div>

          {STEPS.map((step) => {
            const isActive = step.id === currentStep;
            const isPast = step.id < currentStep;

            return (
              <div
                key={step.id}
                data-step={step.id}
                className="flex flex-col items-center gap-2 bg-slate-50 px-2"
                aria-current={isActive ? "step" : undefined}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors font-bold text-sm ${
                    isActive
                      ? "bg-indigo-600 border-indigo-600 text-white"
                      : isPast
                      ? "bg-indigo-100 border-indigo-600 text-indigo-600"
                      : "bg-white border-slate-300 text-slate-400"
                  }`}
                >
                  {step.id}
                </div>
                <span
                  className={`text-xs font-semibold hidden md:block ${
                    isActive ? "text-indigo-700" : "text-slate-500"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 min-h-[550px]">
          {aiError && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-center justify-between gap-4">
              <span>{aiError}</span>
              <button
                type="button"
                onClick={retryLastAction}
                className="text-xs font-semibold uppercase tracking-wide text-red-700 hover:text-red-900"
              >
                Retry
              </button>
            </div>
          )}
          {currentStep === 1 && (
            <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">
                  Project Foundation
                </h2>
                <p className="text-slate-500">
                  Define the overarching goal and business logic for your PRD.
                </p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="block text-sm font-semibold text-slate-700 mb-2"
                      htmlFor="app-name"
                    >
                      App Name
                    </label>
                    <input
                      id="app-name"
                      type="text"
                      value={appData.name}
                      onChange={(event) =>
                        setAppData({ ...appData, name: event.target.value })
                      }
                      placeholder="e.g., TaskMaster Pro"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-semibold text-slate-700 mb-2"
                      htmlFor="monetization"
                    >
                      Monetization
                    </label>
                    <select
                      id="monetization"
                      value={appData.monetization}
                      onChange={(event) =>
                        setAppData({
                          ...appData,
                          monetization: event.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all appearance-none"
                    >
                      <option value="" disabled>
                        Select strategy...
                      </option>
                      <option value="100% Free / Open Source">
                        Free / Open Source
                      </option>
                      <option value="Freemium (Free tier + Paid features)">
                        Freemium
                      </option>
                      <option value="Monthly/Annual SaaS Subscription">
                        SaaS Subscription
                      </option>
                      <option value="One-time Purchase (Lifetime deal)">
                        One-time Purchase
                      </option>
                      <option value="Ad-supported">Ad-supported</option>
                      <option value="Marketplace (Commission per transaction)">
                        Marketplace / Commission
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold text-slate-700 mb-2"
                    htmlFor="audience"
                  >
                    Target Audience
                  </label>
                  <input
                    id="audience"
                    type="text"
                    value={appData.audience}
                    onChange={(event) =>
                      setAppData({ ...appData, audience: event.target.value })
                    }
                    placeholder="e.g., Freelance Designers, Gym Owners, etc."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold text-slate-700 mb-2"
                    htmlFor="pitch"
                  >
                    Elevator Pitch (The Core Problem)
                  </label>
                  <textarea
                    id="pitch"
                    value={appData.pitch}
                    onChange={(event) =>
                      setAppData({ ...appData, pitch: event.target.value })
                    }
                    placeholder="Describe the problem you are solving in 1-2 sentences..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none h-32 resize-none transition-all"
                  />
                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={handleEnhancePitchAI}
                      disabled={!appData.pitch.trim() || aiStatus.pitch === "loading"}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
                    >
                      {aiStatus.pitch === "loading"
                        ? "Enhancing..."
                        : "Enhance Pitch with AI"}
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800">
                      AI Settings (Gemini)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Keys are stored in the browser during this session. Use a
                      server proxy for production.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        className="block text-sm font-semibold text-slate-700 mb-2"
                        htmlFor="gemini-api-key"
                      >
                        Gemini API Key
                      </label>
                      <input
                        id="gemini-api-key"
                        type="password"
                        value={geminiApiKey}
                        onChange={(event) =>
                          setGeminiApiKey(event.target.value)
                        }
                        placeholder="Paste your API key"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-semibold text-slate-700 mb-2"
                        htmlFor="gemini-model"
                      >
                        Gemini Model
                      </label>
                      <input
                        id="gemini-model"
                        type="text"
                        value={geminiModel}
                        onChange={(event) =>
                          setGeminiModel(event.target.value)
                        }
                        placeholder="gemini-2.5-flash"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    <span>Need a clean slate? Reset the wizard state.</span>
                    <button
                      type="button"
                      onClick={resetWizard}
                      className="text-xs font-semibold uppercase tracking-wide text-slate-600 hover:text-slate-900"
                    >
                      Reset Wizard
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">
                  Technical Foundation
                </h2>
                <p className="text-slate-500">
                  Select a curated tech stack preset. AI will handle the granular
                  details later.
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSuggestStackAI}
                  disabled={aiStatus.stack === "loading"}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-sm font-semibold transition-colors"
                >
                  {aiStatus.stack === "loading"
                    ? "Suggesting..."
                    : "Auto-Suggest Best Fit"}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {STACK_PRESETS.map((stack) => (
                  <button
                    type="button"
                    key={stack.id}
                    onClick={() => setSelectedStack(stack.id)}
                    aria-label={stack.name}
                    aria-pressed={selectedStack === stack.id}
                    className={`text-left border-2 rounded-xl p-5 transition-all ${
                      selectedStack === stack.id
                        ? "border-indigo-600 bg-indigo-50 shadow-md"
                        : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-slate-800">
                        {stack.name}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-snug">
                      {stack.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Feature Brainstorm</h2>
                <p className="text-slate-500">
                  List every feature, page, and capability. Don&apos;t worry
                  about order yet.
                </p>
              </div>

              <form onSubmit={handleAddFeature} className="relative">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(event) => setNewFeature(event.target.value)}
                  placeholder="Type a feature and press Enter..."
                  className="w-full pl-4 pr-24 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-indigo-500 outline-none transition-all shadow-inner text-lg"
                />
                <button
                  type="submit"
                  disabled={!newFeature.trim()}
                  className="absolute right-2 top-2 bottom-2 px-6 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-colors font-medium"
                >
                  Add
                </button>
              </form>

              <div className="flex justify-between items-center border-t border-slate-100 pt-6">
                <span className="text-sm font-semibold text-slate-500">
                  {features.length} Features Added
                </span>
                <button
                  type="button"
                  onClick={handleSuggestFeaturesAI}
                  disabled={aiStatus.features === "loading"}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-sm font-semibold transition-colors"
                >
                  {aiStatus.features === "loading"
                    ? "Suggesting..."
                    : "Suggest Missing Core Features"}
                </button>
              </div>

              <div className="flex flex-col gap-2 mt-4 max-h-[350px] overflow-y-auto pr-2">
                {features.map((feature) => (
                  <div
                    key={feature.id}
                    className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg shadow-sm group"
                  >
                    <span className="text-sm font-medium text-slate-700">
                      {feature.text}
                    </span>
                    <div className="flex items-center gap-3">
                      <label
                        className="sr-only"
                        htmlFor={`priority-${feature.id}`}
                      >
                        Priority for {feature.text}
                      </label>
                      <select
                        id={`priority-${feature.id}`}
                        value={feature.priority}
                        onChange={(event) =>
                          handlePriorityChange(
                            feature.id,
                            Number(event.target.value) as 1 | 2 | 3
                          )
                        }
                        className={`text-xs font-bold px-2 py-1 rounded outline-none cursor-pointer border ${
                          feature.priority === 1
                            ? "bg-red-50 text-red-700 border-red-200"
                            : feature.priority === 3
                            ? "bg-slate-50 text-slate-600 border-slate-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        <option value={1}>P1</option>
                        <option value={2}>P2</option>
                        <option value={3}>P3</option>
                      </select>
                      <button
                        type="button"
                        aria-label={`Delete ${feature.text}`}
                        onClick={() => handleRemoveFeature(feature.id)}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {features.length === 0 && (
                  <div className="w-full py-12 text-center border-2 border-dashed border-slate-200 rounded-xl text-slate-400">
                    Your feature list is empty. Start typing above!
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
              {(() => {
                const poolCount = features.filter(
                  (feature) => feature.phase === "Pool"
                ).length;
                return (
                  <div className="flex justify-between items-end flex-wrap gap-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Hoijof Phasing</h2>
                      <p className="text-slate-500">
                        Drag features or add them inline. Prevent MVP bloat.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleAddPhase}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-sm font-semibold transition-colors"
                      >
                        Add Phase
                      </button>
                      <button
                        type="button"
                        onClick={handleAutoTriageAI}
                        disabled={
                          aiStatus.triage === "loading" || poolCount === 0
                        }
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-sm font-semibold transition-colors"
                      >
                        {aiStatus.triage === "loading"
                          ? "Auto-Triaging..."
                          : "Auto-Triage Remaining"}
                      </button>
                    </div>
                  </div>
                );
              })()}

              <div className="flex gap-4 overflow-x-auto pb-4 flex-1 items-start snap-x">
                {["Pool", ...dynamicPhases].map((phase) => {
                  const phaseFeatures = features
                    .filter((feature) => feature.phase === phase)
                    .sort((a, b) => a.priority - b.priority);
                  const isMvp = phase === "MVP";
                  const isOverloaded = isMvp && phaseFeatures.length > 5;
                  const isCollapsed = collapsedPhases[phase];

                  return (
                    <div
                      key={phase}
                      data-testid={`phase-${phase}`}
                      data-collapsed={isCollapsed ? "true" : "false"}
                      onDragOver={!isCollapsed ? handleDragOver : undefined}
                      onDrop={
                        !isCollapsed
                          ? (event) => handleDrop(event, phase)
                          : undefined
                      }
                      className={`snap-center bg-slate-50 rounded-xl border flex flex-col max-h-[500px] transition-all duration-300 ${
                        isOverloaded && !isCollapsed
                          ? "border-amber-300"
                          : "border-slate-200"
                      } ${
                        isCollapsed
                          ? "min-w-[80px] w-[80px] overflow-hidden"
                          : "min-w-[280px] w-[280px] flex-1"
                      }`}
                    >
                      <div
                        className={`p-3 border-b flex justify-between items-center shrink-0 ${
                          isOverloaded && !isCollapsed
                            ? "bg-amber-50 border-amber-200"
                            : "bg-white border-slate-200"
                        } ${
                          isCollapsed
                            ? "rounded-xl h-full flex-col items-center justify-between py-4 gap-3"
                            : "rounded-t-xl"
                        }`}
                      >
                        {!isCollapsed ? (
                          <>
                            <span className="font-bold text-slate-700 flex items-center gap-2">
                              {phase === "Pool" ? "Feature Pool" : phase}
                              {isOverloaded && (
                                <span className="text-xs text-amber-600">
                                  MVP Overload
                                </span>
                              )}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-md font-semibold">
                                {phaseFeatures.length}
                              </span>
                              <button
                                type="button"
                                aria-label={`Collapse ${phase}`}
                                onClick={() => togglePhaseCollapse(phase)}
                                className="text-slate-400 hover:text-slate-700 p-1.5 rounded hover:bg-slate-100"
                              >
                                <svg
                                  viewBox="0 0 24 24"
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  aria-hidden="true"
                                >
                                  <path d="M10 14L4 20" />
                                  <path d="M4 14V20H10" />
                                  <path d="M14 10L20 4" />
                                  <path d="M20 10V4H14" />
                                </svg>
                                <span className="sr-only">Collapse</span>
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              aria-label={`Expand ${phase}`}
                              onClick={() => togglePhaseCollapse(phase)}
                              className="text-slate-400 hover:text-slate-700 p-1.5 rounded hover:bg-slate-200"
                            >
                              <svg
                                viewBox="0 0 24 24"
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M14 10L20 4" />
                                <path d="M20 10V4H14" />
                                <path d="M10 14L4 20" />
                                <path d="M4 14V20H10" />
                              </svg>
                              <span className="sr-only">Expand</span>
                            </button>
                            <div className="flex-1 flex items-center justify-center py-2">
                              <span className="font-semibold text-slate-700 tracking-wide [writing-mode:vertical-rl] [text-orientation:mixed]">
                                {phase === "Pool" ? "Feature Pool" : phase}
                              </span>
                            </div>
                            <span className="bg-slate-200 text-slate-600 text-xs font-semibold w-7 h-7 rounded-full flex items-center justify-center mt-1">
                              {phaseFeatures.length}
                            </span>
                          </>
                        )}
                      </div>

                      {!isCollapsed && (
                        <>
                          <div className="flex-1 p-3 space-y-2 overflow-y-auto">
                            {phaseFeatures.map((feature) => (
                              <div
                                key={feature.id}
                                draggable
                                onDragStart={(event) =>
                                  handleDragStart(feature.id, event)
                                }
                                className={`p-3 bg-white border rounded-lg shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-all flex justify-between group gap-2 ${
                                  feature.priority === 1
                                    ? "border-l-4 border-l-red-500 border-slate-200 hover:border-red-300"
                                    : feature.priority === 3
                                    ? "border-l-4 border-l-slate-300 border-slate-200 hover:border-slate-400"
                                    : "border-l-4 border-l-amber-400 border-slate-200 hover:border-amber-300"
                                }`}
                              >
                                <span className="text-sm font-medium text-slate-700 leading-snug">
                                  {feature.text}
                                </span>
                                <button
                                  type="button"
                                  aria-label={`Delete ${feature.text}`}
                                  onClick={() => handleRemoveFeature(feature.id)}
                                  className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-opacity"
                                >
                                  Delete
                                </button>
                              </div>
                            ))}
                          </div>

                          <div className="p-3 border-t border-slate-200 bg-white rounded-b-xl shrink-0">
                            <form
                              onSubmit={(event) => handleInlineAdd(event, phase)}
                            >
                              <input
                                type="text"
                                placeholder={`Add to ${phase}...`}
                                value={inlineInputs[phase] || ""}
                                onChange={(event) =>
                                  setInlineInputs({
                                    ...inlineInputs,
                                    [phase]: event.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-sm focus:border-indigo-500 outline-none"
                              />
                            </form>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
              <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    Final Documentation
                  </h2>
                  <p className="text-slate-500">
                    Your AI-ready PRD and Phase Roadmaps are generated.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadZip}
                  disabled={isZipping}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-bold shadow-md transition-all disabled:opacity-50"
                >
                  {isZipping ? "Zipping..." : "Download All as ZIP"}
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 overflow-hidden">
                <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800 flex flex-col max-h-[450px]">
                  <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700 shrink-0">
                    <span className="text-xs font-mono text-indigo-300 font-bold">
                      PRD.md
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(generatePRD())}
                      className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <pre
                    className="p-4 text-xs text-slate-300 font-mono overflow-y-auto flex-1 whitespace-pre-wrap"
                    data-testid="prd-preview"
                  >
                    {generatePRD()}
                  </pre>
                </div>

                <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2">
                  {dynamicPhases
                    .filter((phase) => phase !== "Backlog")
                    .map((phase) => (
                      <div
                        key={phase}
                        className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200 flex flex-col"
                      >
                        <div className="flex items-center justify-between px-4 py-2 bg-slate-100 border-b border-slate-200 shrink-0">
                          <span className="text-xs font-mono text-slate-600 font-bold">
                            plans/{phase.replace(/\s+/g, "")}/
                            {phase.toLowerCase().replace(/\s+/g, "-")}-roadmap.md
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              copyToClipboard(generatePhaseMarkdown(phase))
                            }
                            className="text-xs bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded transition-colors"
                          >
                            Copy
                          </button>
                        </div>
                        <pre
                          className="p-4 text-xs text-slate-700 font-mono overflow-y-auto max-h-[250px] whitespace-pre-wrap bg-white"
                          data-testid={`phase-preview-${phase}`}
                        >
                          {generatePhaseMarkdown(phase)}
                        </pre>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
            </div>

            <div className="flex items-center justify-between mt-6">
          <button
            type="button"
            onClick={goBack}
            disabled={currentStep === 1}
            className="px-6 py-3 rounded-xl font-semibold text-slate-600 hover:bg-white border border-transparent hover:border-slate-200 disabled:opacity-50 disabled:hover:bg-transparent transition-all"
          >
            Back
          </button>

          {currentStep < STEPS.length ? (
            <button
              type="button"
              onClick={goNext}
              className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all"
            >
              Next Step
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-8 py-3 bg-white text-slate-700 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition-all"
            >
              Start New App
            </button>
          )}
            </div>
          </div>

          {ADS_ENABLED && (
            <aside className="hidden xl:block w-72 shrink-0 sticky top-24 h-[calc(100vh-6rem)]">
              <AdSlot slot={AD_SLOTS[1]} />
            </aside>
          )}
        </div>
      </main>
    </div>
  );
}
