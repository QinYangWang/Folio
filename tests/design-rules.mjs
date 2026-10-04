// Static checks for the machine-verifiable rules in .agents/skills/kumo-design.
// Run: node tests/design-rules.mjs   (no browser or dev server needed)
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const SCAN = ["registry/ui", "registry/lib", "apps/docs/src/examples"];
// text-xs is reserved for compact annotations (see AGENTS.md).
const TEXT_XS_ALLOW = new Set(["registry/ui/badge.tsx", "registry/ui/avatar.tsx"]);

const RADIUS = { "": 4, xs: 2, sm: 4, md: 6, lg: 8, xl: 12, "2xl": 16, "3xl": 24 };
const SPACE = (n) => Number(n) * 4;
const DROP_SHADOW = /^shadow-folio-(raised|brand|card|knob)$/;

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory()
      ? walk(path)
      : /\.(tsx?|mjs)$/.test(name)
        ? [path]
        : [];
  });
}

// Split "before:hover:border-2" into ["before:hover:", "border-2"].
function split(token) {
  const i = token.lastIndexOf(":");
  return i < 0 ? ["", token] : [token.slice(0, i + 1), token.slice(i + 1)];
}
const pseudo = (variants) =>
  variants.split(":").filter((v) => v === "before" || v === "after").join(":");

function radiusOf(tokens) {
  for (const t of tokens) {
    const [v, base] = split(t);
    if (v) continue;
    let m = base.match(/^rounded(?:-(xs|sm|md|lg|xl|2xl|3xl))?$/);
    if (m) return RADIUS[m[1] ?? ""];
    m = base.match(/^rounded-\[(\d+)px\]$/);
    if (m) return Number(m[1]);
  }
}
function paddingOf(tokens) {
  let x, y;
  for (const t of tokens) {
    const [v, base] = split(t);
    if (v) continue;
    const m = base.match(/^p([xy]?)-([\d.]+)$/);
    if (!m) continue;
    if (m[1] !== "y") x = SPACE(m[2]);
    if (m[1] !== "x") y = SPACE(m[2]);
  }
  return x === undefined && y === undefined ? undefined : Math.min(x ?? y, y ?? x);
}

const failures = [];
const fail = (file, rule, detail) => failures.push(`${file}: [${rule}] ${detail}`);

for (const abs of SCAN.flatMap((d) => walk(join(root, d)))) {
  const file = relative(root, abs);
  const source = readFileSync(abs, "utf8");
  const strings = [...source.matchAll(/"([^"\n]*)"|`([^`]*)`/g)].map((m) => m[1] ?? m[2]);
  const classStrings = strings.filter((s) => /\b(flex|grid|text-|bg-|p[xy]?-|rounded|shadow|ring|border|font-|tracking-|transition)/.test(s));
  const containers = [];
  const items = [];

  for (const cls of classStrings) {
    const tokens = cls.split(/\s+/).filter(Boolean);
    for (const t of tokens) {
      const [, base] = split(t);
      if (base === "font-bold") fail(file, "font-weight", "use font-semibold (headings) or font-medium");
      if (/^tracking-/.test(base)) fail(file, "font-tracking", `remove ${t}`);
      if (base === "uppercase" || base === "capitalize") fail(file, "heading-case", `remove ${t}`);
      if (base === "transition" || base === "transition-colors" || base === "transition-all" ||
          (/^transition-\[/.test(base) && /color|background|fill|stroke/.test(base)))
        fail(file, "hover-color-transitions", `remove ${t}`);
      if (/^text-\[(\d+)px\]$/.test(base) && Number(base.match(/\d+/)[0]) < 14)
        fail(file, "content-text-size", `${t} is below 14px`);
      if (base === "text-xs" && !TEXT_XS_ALLOW.has(file))
        fail(file, "content-text-size", "content text must be text-sm (14px)");
      if (base === "font-mono" && !tokens.some((x) => /^text-\[0\.9em\]$/.test(x)))
        fail(file, "inline-monospace-size", "inline font-mono needs text-[0.9em]");
      if (base === "sticky" && !tokens.some((x) => /^border(-[btlrxy])?($|-)/.test(split(x)[1])))
        fail(file, "sticky-borders", "sticky elements need a border separator");
    }

    // Border + drop shadow on the same element (same pseudo-element).
    const borders = tokens.filter((t) => /^border(-[xytblr])?(-\d+|-\[\d+px\])?$/.test(split(t)[1]) && split(t)[1] !== "border-0");
    for (const b of borders) {
      const shadow = tokens.find((t) => DROP_SHADOW.test(split(t)[1]) && pseudo(split(t)[0]) === pseudo(split(b)[0]));
      if (shadow) fail(file, "shadow-borders", `${b} with ${shadow}; use a ring instead`);
    }

    const r = radiusOf(tokens);
    const p = paddingOf(tokens);
    if (tokens.includes("shadow-folio-card")) {
      if (r !== undefined && p !== undefined) containers.push({ cls, r, p });
      const sym = tokens.find((t) => /^p-([\d.]+)$/.test(t) && SPACE(t.slice(2)) >= 12);
      if (sym) fail(file, "text-spacing", `${sym} on a text surface; use px-N py-(N-1)`);
    } else if (r !== undefined && /data-\[(focused|selected|pressed)\]/.test(cls)) {
      items.push({ cls, r });
    }
  }

  // Concentric radii: outer = inner + padding when padding <= 8px.
  for (const c of containers) {
    if (c.p > 8) continue;
    for (const it of items) {
      if (c.r !== it.r + c.p)
        fail(file, "concentric-border-radius", `container radius ${c.r}px with padding ${c.p}px holds items with radius ${it.r}px`);
    }
  }

  // Never conditionally render dialogs.
  if (/\{\s*[\w.!]+\s*&&\s*\(?\s*<(AnimatedOverlay|ModalOverlay|Modal|Dialog)\b/.test(source))
    fail(file, "dialog-rendering", "drive dialogs with isOpen instead of {open && ...}");
}

if (failures.length) {
  console.error(failures.join("\n"));
  console.error(`\nFAIL: ${failures.length} kumo-design violation(s)`);
  process.exit(1);
}
console.log("PASS: kumo-design static rules (font, tracking, case, transitions, text size, shadow borders, radii, spacing, dialogs)");
