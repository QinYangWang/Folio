# Folio UI

React Aria + Tailwind CSS v4 + Motion. Source-distributed components with Kumo semantic colors and tactile surfaces.

## Repository layout

```text
apps/docs/                 Vite documentation and preview application
  src/pages/               Component reference, handbook and block preview pages
  src/examples/            Examples importing the real registry components
  src/lib/                 Component catalog and routing utilities
  public/r/                Generated installable registry items
registry/
  ui/                      62 independently installable components
  lib/                     Shared class merging and motion presets
  styles/                  Color/surface definitions and generated Tailwind theme
registry.json              Source manifest: component files and npm dependencies
scripts/                   Theme and registry generators
tests/                     Standalone installation, browser and token checks
```

There is one dependency lockfile and one build configuration. This source registry does not need an npm workspace package or a published runtime package. The docs resolve `@/ui/*` and `@/lib/*` directly to registry source; there is no second copy of the components.

## Development

```sh
npm install
npm run dev
npm run build
```

Vite serves `apps/docs`; production output is `dist`. Dev/build regenerate the registry and theme. Run `npm run registry:build` after changing registry source during development to refresh downloadable JSON.

## Skills

Component design follows Cloudflare's [Kumo design skill](https://kumo-ui.com/skill/), vendored at `.agents/skills/kumo-design/SKILL.md` and pinned in `skills-lock.json`. Coding agents that read `.agents/skills` (and `AGENTS.md`) load it automatically. `AGENTS.md` maps Kumo names to Folio equivalents, for example `LayerCard` to `Card` and `ring-kumo-line` to `shadow-folio-card`.

```sh
npm run test:design   # static check for the machine-verifiable rules
```

Progress per rule and per component is tracked in [`docs/kumo-design-progress.md`](docs/kumo-design-progress.md).

## Component reference

The catalog covers all 54 component families in the [React Aria component sidebar](https://react-aria.adobe.com/Button), plus Dialog, Input, TextArea, Label and Folio’s Alert, Avatar, Badge and Card. There are 62 individual pages and installable items. Compound parts live beside their parent in the same source file. Toast explicitly exposes the upstream unstable API and is marked alpha.

Each page includes a working preview, its source, standalone and composed-example installation commands, key props, accessibility notes and upstream API links. Hash routes such as `#/components/date-picker` support refresh and browser history on GitHub Pages without server rewrites. The source shown on a page is imported from the same example file used by its preview.

## Install components

In a React project with Tailwind v4 and a configured shadcn `components.json`:

```sh
npx shadcn@latest add http://localhost:5173/r/button.json
npx shadcn@latest add http://localhost:5173/r/text-field.json
npx shadcn@latest add http://localhost:5173/r/dialog.json
```

Use the actual dev-server port, or your deployed docs URL. Every catalog entry has an independent registry URL, including dates, colors, collections, overlays and form primitives. React Aria Components 1.21.1 or later is required. `/r/folio.json` installs all components; `/r/theme.json` installs only the theme. No named namespace is claimed.

Each component item contains one UI source file, only the shared helpers it needs, its npm dependencies and the shared theme CSS. This avoids hardcoded registry dependency URLs and works when the site hostname changes. Shared helper targets are deduplicated by the CLI. Configure the homepage in `registry.json` before publishing.

```tsx
import { Button } from '@/components/ui/button';
import { TextField } from '@/components/ui/text-field';

<TextField label="Email" name="email" type="email" isRequired />
<Button variant="primary">Continue</Button>
```

The CLI resolves targets using the consuming project's aliases. Components use individual files, not the former `folio.tsx` barrel; existing consumers should update imports when migrating. Dialog exports `AnimatedOverlay` and `AnimatedModal`: pass `isOpen` and `onOpenChange` to the overlay and put React Aria `Dialog` inside the modal. Tooltip expects a focusable React Aria trigger such as Button. Select supports labeled options, disabled options, controlled selection, descriptions and errors. TextField forwards React Aria form and validation properties.

## Themes and materials

`registry/styles/tokens.json` defines 54 semantic tokens based on [Kumo](https://kumo-ui.com/colors/). Text and background namespaces remain separate. `surfaces.json` adds gradients, highlights and raised/inset shadows. `npm run theme` generates `tokens.css`; registry payloads embed the same CSS.

Set `data-mode="light"` or `data-mode="dark"` on `<html>` so portals inherit the mode. Otherwise the system preference applies. Motion primitives respect reduced motion independently; the docs additionally use `MotionConfig reducedMotion="user"`.

## Adding a component

1. Add its implementation in `registry/ui`, using semantic Tailwind tokens rather than docs CSS.
2. Declare its files, shared helpers and npm dependencies in `registry.json`.
3. Add an entry to `apps/docs/src/lib/catalog.ts` and a real example in `apps/docs/src/examples/components/<slug>.tsx`. The documentation page loads the example lazily and displays its actual source; there is no separate snippet to maintain.
4. Run `npm run build` and `npm run test:registry`.

## Verification

```sh
npm run build
npm run test:registry
# With the dev server running:
FOLIO_TEST_URL=http://localhost:5173 npm test
```

Registry checks materialize each installable item separately and compile it without documentation source, verify declared npm dependencies, and compare generated payloads against actual component source. Browser checks cover keyboard interactions, modal focus restoration, themes, mobile layout and reduced motion.

## Commercial blocks

The Blocks page remains a preview, not a published block package. Payments, accounts, licenses and protected downloads are not implemented. Keep future paid source in a private repository or authenticated service, never under `apps/docs/public`. Free blocks can later be added under `registry/blocks/<name>` with explicit `registry:block` entries; no empty or placeholder blocks are published.

## GitHub Pages

Production URL: https://qinyangwang.github.io/Folio/

`.github/workflows/pages.yml` builds, validates the registry and production browser interactions, then deploys `dist` on pushes to `main`. Pages must use **GitHub Actions** as its source. The workflow uses the built-in `GITHUB_TOKEN`; no deployment secret is needed. Private repositories require a GitHub plan that supports Pages.

`npm run build:pages` sets Vite's base to `/Folio/`. Preview that build with `npm run preview -- --mode pages`, then visit `/Folio/`. Local development keeps `/`. Install commands derive their URLs from the base path, so published items resolve under `/Folio/r/`:

```sh
npx shadcn@latest add https://qinyangwang.github.io/Folio/r/button.json
```

The Pages site and free registry endpoints are publicly accessible once published, even if repository visibility is private. The site contains no paid block source or authentication secrets.
