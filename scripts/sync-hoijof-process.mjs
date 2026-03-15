import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(repoRoot, "hoijof-process.md");
const dest = path.join(repoRoot, "public", "hoijof-process.md");

const main = async () => {
  const content = await readFile(src, "utf8");
  await mkdir(path.dirname(dest), { recursive: true });
  await writeFile(dest, content.endsWith("\n") ? content : `${content}\n`, "utf8");
  // eslint-disable-next-line no-console
  console.log(`Synced ${path.relative(repoRoot, src)} -> ${path.relative(repoRoot, dest)}`);
};

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("sync-hoijof-process failed:", error);
  process.exitCode = 1;
});

