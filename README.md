# Folio UI

React + TypeScript + React Aria Components + Tailwind CSS v4. A Kumo-inspired component library and shadcn registry starter.

## Development

```sh
npm install
npm run build
npm run dev
```

## Install the primitives in another application

Prepare a React project with Tailwind CSS v4 and initialize shadcn, then run:

```sh
npx shadcn@latest add http://localhost:5173/r/folio.json
```

Import `Button`, `Field`, `Checkbox`, and `Switch` from your configured UI directory's `folio.tsx`. Each uses React Aria for interaction. The remaining catalog entries are preview patterns, not individually published registry components. Build regenerates the registry from the actual source. Configure your production URL before publishing; a named `@folio` namespace has not been registered.

## Commercial blocks

The Blocks page is a visual preview only. Payment, accounts, licenses, and authenticated source delivery are not implemented. Do not place paid source in `public/r`: it is publicly downloadable. A production paid registry needs server-side purchase verification, signed webhooks, and authorized registry endpoints. Pricing and payment provider remain product decisions.

## Color tokens

`src/theme/tokens.json` defines all 54 semantic tokens from [Kumo’s token reference](https://kumo-ui.com/colors/). Primitive references resolve to Tailwind v4 colors when defined (for example, blue-500), with documented fallbacks for Kumo-only primitives. Text and surface namespaces remain separate: brand text is orange, brand controls are blue.

Run `npm run theme` to generate `src/theme/tokens.css`. Both dev and build regenerate the CSS and embed it in the shadcn registry, so installed components receive the same theme. Two Folio-only tokens cover constant foregrounds on brand controls and the modal backdrop.

Set `data-mode="light"` or `data-mode="dark"` on `<html>`. Without an explicit mode, the system preference applies. Colors use `light-dark()`; no inversion filters or `dark:` classes are required. Set the mode on the document to include portaled dialogs. The Theming page displays all token values.

## Verification

`npm run build` checks TypeScript and builds the registry and site. Start the dev server, then run `FOLIO_TEST_URL=http://localhost:5173 npm test` for token checks and browser smoke tests.

## References

- https://ui.shadcn.com/docs/registry/examples
- https://kumo-ui.com/skill/
- https://react-aria.adobe.com/
