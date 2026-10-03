import { registryCss as css, registryCssVars as cssVars } from "./theme.mjs";
import { readFile, mkdir, writeFile, readdir, unlink } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
const root = fileURLToPath(new URL("../", import.meta.url));
const manifest = JSON.parse(
  await readFile(path.join(root, "registry.json"), "utf8"),
);
const output = path.join(root, "apps/docs/public/r");
await mkdir(output, { recursive: true });
const schema = "https://ui.shadcn.com/schema/registry-item.json";
const built = [];
for (const item of manifest.items) {
  const files = await Promise.all(
    item.files.map(async (file) => {
      if (!file.path.startsWith("registry/") || file.path.includes(".."))
        throw new Error(`Unsafe source: ${file.path}`);
      return {
        ...file,
        content: await readFile(path.join(root, file.path), "utf8"),
      };
    }),
  );
  built.push({ $schema: schema, ...item, css, cssVars, files });
}
// Each item is self-contained: shared helper files only, no other UI component or remote URL dependency.
const allFiles = [
  ...new Map(
    built.flatMap((item) => item.files).map((file) => [file.path, file]),
  ).values(),
];
const dependencies = [...new Set(built.flatMap((item) => item.dependencies))];
built.push({
  $schema: schema,
  name: "folio",
  type: "registry:ui",
  title: "All Folio components",
  description: "Optional full component bundle.",
  css,
  dependencies,
  files: allFiles,
});
built.push({
  $schema: schema,
  name: "theme",
  type: "registry:theme",
  title: "Folio theme",
  css,
});
const expected = new Set(built.map((item) => `${item.name}.json`));
for (const file of await readdir(output))
  if (file.endsWith(".json") && !expected.has(file))
    await unlink(path.join(output, file));
for (const item of built)
  await writeFile(
    path.join(output, `${item.name}.json`),
    JSON.stringify({ ...item, cssVars }, null, 2) + "\n",
  );
await writeFile(
  path.join(root, "apps/docs/public/registry.json"),
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log(`Built ${built.length} registry items from registry.json`);
