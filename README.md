# Folio UI

React Aria + Tailwind CSS v4 + Motion. Source-distributed components with Kumo semantic colors and tactile surfaces.

## Repository layout

```text
apps/docs/                 Vite documentation and preview application
  src/pages/               Handbook and commercial block preview pages
  src/examples/            Examples importing the real registry components
  src/lib/                 Documentation snippets
  public/r/                Generated installable registry items
registry/
  ui/                      12 independently installable components
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

## Install components

In a React project with Tailwind v4 and a configured shadcn `components.json`:

```sh
npx shadcn@latest add http://localhost:5173/r/button.json
npx shadcn@latest add http://localhost:5173/r/text-field.json
npx shadcn@latest add http://localhost:5173/r/dialog.json
```

Use the actual dev-server port, or your deployed docs URL. Individual URLs also exist for checkbox, switch, badge, card, tabs, select, avatar, alert, and tooltip. `/r/folio.json` installs all components; `/r/theme.json` installs only the theme. No named namespace is claimed.

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
3. Add a real usage example in `apps/docs/src/examples` and a snippet in `src/lib/snippets.ts`.
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
