import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const today = () => new Date().toISOString().split("T")[0];

const exists = async (p) => {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
};

const loadTemplate = async (name) => {
  const templatePath = path.join(repoRoot, "plans", "_templates", name);
  return readFile(templatePath, "utf8");
};

const render = (template, vars) =>
  template.replace(/\{\{([A-Z0-9_]+)\}\}/g, (_, key) =>
    Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : ""
  );

const phaseSlug = (phaseTitle) => phaseTitle.trim().toLowerCase().replace(/\s+/g, "");

const titleFromMilestoneId = (milestoneId) => {
  const tail = milestoneId.split("-").slice(2).join("-"); // drop pX-mY
  if (!tail) return milestoneId;
  return tail
    .split("-")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};

const insertMilestoneIntoRoadmap = async ({
  roadmapPath,
  milestoneTitle,
  designFile,
  implFile,
}) => {
  const marker = "<!-- MILESTONES: scaffold script inserts new milestones here -->";
  const block = `\n### ${milestoneTitle}\n\n**Goal:** TBD\n**Dependencies:** TBD\n**Design Doc:** ${designFile}\n**Implementation:** ${implFile}\n`;

  const current = await readFile(roadmapPath, "utf8");
  if (current.includes(block.trim())) return;

  if (current.includes(marker)) {
    const updated = current.replace(marker, `${marker}\n${block.trim()}\n`);
    await writeFile(roadmapPath, updated, "utf8");
    return;
  }

  // Fallback insertion: append into "## Milestone Details" section if present.
  const header = "## Milestone Details";
  const headerIndex = current.indexOf(header);
  if (headerIndex === -1) {
    await writeFile(roadmapPath, `${current.trimEnd()}\n\n${block.trim()}\n`, "utf8");
    return;
  }

  const afterHeaderIndex = headerIndex + header.length;
  const nextSectionIndex = current.indexOf("\n## ", afterHeaderIndex);
  const insertAt = nextSectionIndex === -1 ? current.length : nextSectionIndex;
  const updated = `${current.slice(0, insertAt).trimEnd()}\n\n${block.trim()}\n\n${current
    .slice(insertAt)
    .trimStart()}`;
  await writeFile(roadmapPath, updated, "utf8");
};

const newPhase = async (rawPhase) => {
  if (!rawPhase) throw new Error("Missing phase name (e.g. Phase4).");
  const phaseTitle = rawPhase.replace(/_/g, " ").replace(/\s+/g, " ").trim();
  const slug = phaseSlug(phaseTitle);
  const folder = path.join(repoRoot, "plans", phaseTitle);
  const roadmapPath = path.join(folder, `${slug}-roadmap.md`);
  const finalStatusPath = path.join(folder, `${slug}-final-status.md`);

  if (await exists(roadmapPath)) {
    throw new Error(`Roadmap already exists: ${path.relative(repoRoot, roadmapPath)}`);
  }

  await mkdir(folder, { recursive: true });
  const roadmapTemplate = await loadTemplate("phase-roadmap.template.md");
  const finalTemplate = await loadTemplate("phase-final-status.template.md");

  const vars = {
    PHASE_TITLE: phaseTitle,
    DATE: today(),
  };
  await writeFile(roadmapPath, render(roadmapTemplate, vars), "utf8");
  await writeFile(finalStatusPath, render(finalTemplate, vars), "utf8");

  // eslint-disable-next-line no-console
  console.log(`Created ${path.relative(repoRoot, roadmapPath)}`);
  // eslint-disable-next-line no-console
  console.log(`Created ${path.relative(repoRoot, finalStatusPath)}`);
};

const newMilestone = async (rawPhase, milestoneId) => {
  if (!rawPhase) throw new Error("Missing phase name (e.g. Phase3).");
  if (!milestoneId) throw new Error("Missing milestone id (e.g. p3-m1-auth).");

  const phaseTitle = rawPhase.replace(/_/g, " ").replace(/\s+/g, " ").trim();
  const slug = phaseSlug(phaseTitle);
  const folder = path.join(repoRoot, "plans", phaseTitle);
  const roadmapPath = path.join(folder, `${slug}-roadmap.md`);

  const milestoneTitle = `${milestoneId.toUpperCase()}: ${titleFromMilestoneId(milestoneId)}`;
  const designFile = `${milestoneId}-design.md`;
  const implFile = `${milestoneId}.md`;
  const designPath = path.join(folder, designFile);
  const implPath = path.join(folder, implFile);

  if (!(await exists(roadmapPath))) {
    throw new Error(`Missing roadmap: ${path.relative(repoRoot, roadmapPath)}`);
  }
  if (await exists(designPath)) {
    throw new Error(`Design doc already exists: ${path.relative(repoRoot, designPath)}`);
  }
  if (await exists(implPath)) {
    throw new Error(`Implementation plan already exists: ${path.relative(repoRoot, implPath)}`);
  }

  const designTemplate = await loadTemplate("milestone-design.template.md");
  const implTemplate = await loadTemplate("milestone-implementation.template.md");
  const vars = { MILESTONE_TITLE: milestoneTitle, DATE: today() };

  await mkdir(folder, { recursive: true });
  await writeFile(designPath, render(designTemplate, vars), "utf8");
  await writeFile(implPath, render(implTemplate, vars), "utf8");

  await insertMilestoneIntoRoadmap({
    roadmapPath,
    milestoneTitle,
    designFile,
    implFile,
  });

  // eslint-disable-next-line no-console
  console.log(`Created ${path.relative(repoRoot, designPath)}`);
  // eslint-disable-next-line no-console
  console.log(`Created ${path.relative(repoRoot, implPath)}`);
  // eslint-disable-next-line no-console
  console.log(`Updated ${path.relative(repoRoot, roadmapPath)}`);
};

const main = async () => {
  const [command, ...args] = process.argv.slice(2);

  if (command === "new-phase") {
    await newPhase(args[0]);
    return;
  }

  if (command === "new-milestone") {
    await newMilestone(args[0], args[1]);
    return;
  }

  throw new Error(
    `Unknown command: ${command}\n\n` +
      "Usage:\n" +
      "  node scripts/hoijof-scaffold.mjs new-phase Phase4\n" +
      "  node scripts/hoijof-scaffold.mjs new-milestone Phase3 p3-m1-something\n"
  );
};

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("hoijof-scaffold failed:", error);
  process.exitCode = 1;
});

