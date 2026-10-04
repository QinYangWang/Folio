import assert from "node:assert/strict";
import { readFile, mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
const manifest = JSON.parse(await readFile("registry.json", "utf8"));
assert.equal(manifest.items.length, 62);
assert.equal(
  new Set(manifest.items.map((item) => item.name)).size,
  manifest.items.length,
);
const basicComponents =
  "Autocomplete Breadcrumbs Button Calendar Checkbox CheckboxGroup ColorArea ColorField ColorPicker ColorSlider ColorSwatch ColorSwatchPicker ColorWheel ComboBox DateField DatePicker DateRangePicker Disclosure DisclosureGroup DropZone FileTrigger Form GridList Group Link ListBox Menu Meter Modal NavigationTree NumberField Popover PreviewTrigger ProgressBar RadioGroup RangeCalendar SearchField Select Separator Slider Switch Table Tabs TagGroup TextField TimeField Toast ToggleButton ToggleButtonGroup TokenField Toolbar Tooltip Tree Virtualizer".split(
    " ",
  );
for (const name of basicComponents) {
  const slug = name.replace(
    /[A-Z]/g,
    (letter, index) => (index ? "-" : "") + letter.toLowerCase(),
  );
  assert.ok(
    manifest.items.some((item) => item.name === slug),
    `${name} missing from registry`,
  );
}
const catalog = await readFile("apps/docs/src/lib/catalog.ts", "utf8");
for (const item of manifest.items) {
  assert.ok(
    new RegExp(`(?:"slug"|slug):\\s*"${item.name}"`).test(catalog),
    `${item.name} missing from documentation`,
  );
  await readFile(`apps/docs/src/examples/components/${item.name}.tsx`, "utf8");
}
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
          item.dependencies.some(
            (dep) => dep === pkg || dep.startsWith(pkg + "@"),
          ),
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
  "PASS: all 62 standalone registry payloads compile with only their declared source files and dependencies",
);
