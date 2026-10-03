import assert from "node:assert/strict";
import { readFile, mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
const manifest = JSON.parse(await readFile("registry.json", "utf8"));
assert.equal(manifest.items.length, 12);
for (const entry of manifest.items) {
  const item = JSON.parse(
    await readFile(`apps/docs/public/r/${entry.name}.json`, "utf8"),
  );
  assert.equal(
    item.files.filter((file) => file.type === "registry:ui").length,
    1,
    `${entry.name} installs unrelated UI`,
  );
  const fixture = await mkdtemp(path.resolve("tests/.registry-"));
  try {
    const paths = [];
    for (const file of item.files) {
      assert.equal(
        file.content,
        await readFile(file.path, "utf8"),
        "Published source must match preview source",
      );
      assert.doesNotMatch(
        file.content,
        /apps\/docs|\.\/components|className="(?:modal|overlay)"/,
      );
      for (const match of file.content.matchAll(/from ['"]([^'"]+)['"]/g)) {
        const spec = match[1];
        if (spec.startsWith("@/") || spec === "react") continue;
        const pkg = spec.startsWith("@")
          ? spec.split("/").slice(0, 2).join("/")
          : spec.split("/")[0];
        assert.ok(
          item.dependencies.includes(pkg),
          `${entry.name} missing package ${pkg}`,
        );
      }
      const target = path.join(
        fixture,
        file.target.replace("@ui/", "components/ui/").replace("@lib/", "lib/"),
      );
      await mkdir(path.dirname(target), { recursive: true });
      await writeFile(target, file.content);
      paths.push(target);
    }
    await writeFile(
      path.join(fixture, "tsconfig.json"),
      JSON.stringify({
        compilerOptions: {
          target: "ES2022",
          module: "ESNext",
          moduleResolution: "Bundler",
          jsx: "react-jsx",
          strict: true,
          skipLibCheck: true,
          noEmit: true,
          baseUrl: fixture,
          paths: { "@/*": ["*"] },
        },
        files: paths,
      }),
    );
    const result = spawnSync(
      process.execPath,
      [
        "node_modules/typescript/bin/tsc",
        "-p",
        path.join(fixture, "tsconfig.json"),
      ],
      { encoding: "utf8" },
    );
    assert.equal(result.status, 0, result.stdout + result.stderr);
    assert.ok(item.cssVars.theme["--shadow-folio-raised"]);
  } finally {
    await rm(fixture, { recursive: true, force: true });
  }
}
console.log(
  "PASS: all 12 standalone registry payloads compile with only their declared source files and dependencies",
);
