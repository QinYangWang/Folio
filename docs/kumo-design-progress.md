# Kumo design optimization progress

Source of truth: [`kumo-design` skill](../.agents/skills/kumo-design/SKILL.md) ([kumo-ui.com/skill](https://kumo-ui.com/skill/)), pinned in [`skills-lock.json`](../skills-lock.json). Folio-specific interpretations live in [`AGENTS.md`](../AGENTS.md).

`npm run test:design` statically enforces every rule marked **auto** below. It reported 28 violations on `f172bb2` and reports 0 now.

Legend: ✅ done · 🟡 partially done / needs follow-up · ⬜ not started · — not applicable

## Rules

| # | Rule | Check | Components | Docs site |
| --- | --- | --- | --- | --- |
| 1 | `content-text-size` 14px content text | auto | ✅ | ⬜ `styles.css` uses 9–13px in ~60 places |
| 2 | `heading-case` sentence case | auto (`uppercase`/`capitalize`) | ✅ | ✅ |
| 3 | `font-tracking` no `tracking-*` | auto | ✅ | ⬜ 5 `letter-spacing` overrides in `styles.css` |
| 4 | `font-weight` no `font-bold` | auto | ✅ | ✅ |
| 5 | `related-text-spacing` | manual | ✅ Alert, Card/Dialog/Modal/Popover examples | ⬜ |
| 6 | `text-spacing` optical padding | auto (`shadow-folio-card` surfaces) | ✅ | ⬜ |
| 7 | `hover-color-transitions` | auto | ✅ removed from `styled()` | ✅ |
| 8 | `shadow-borders` | auto | ✅ | ✅ `.doc-preview` border + card shadow removed (inset-shadow inputs are allowed) |
| 9 | `concentric-border-radius` | auto (same-file containers/items) | ✅ | ⬜ |
| 10 | `icon-alignment` (`h-lh`) | manual | ✅ Alert, Checkbox, Switch, Radio | — |
| 11 | `inline-monospace-size` | auto (examples) | — | ⬜ code spans in `styles.css` |
| 12 | `sticky-borders` | auto | — (no sticky components) | ✅ |
| 13 | `collapse-content-size` | manual | — (Disclosure has no collapse animation yet) | — |
| 14 | `layer-card-nesting` | manual | ✅ no nested `shadow-folio-card` surfaces | ✅ preview frame is now flat, so Card/Menu examples are no longer card-in-card |
| 15 | `dialog-rendering` | auto | ✅ `AnimatedOverlay` stays mounted, driven by `isOpen` | ✅ |

## Components (62)

| Component | Status | Changes / notes |
| --- | --- | --- |
| alert | ✅ | Body 12→14px, `px-3 py-2.5`, icon centered on first line with `h-lh`, title/body gap 4→2px |
| autocomplete | ✅ | ListBox `p-2`→`p-1.5` (12 = 6 + 6) |
| avatar | ✅ | `text-xs` initials kept as an annotation exception |
| badge | ✅ | `text-xs` kept as an annotation exception |
| breadcrumbs | ✅ | No color transition (via `styled()`) |
| button | ✅ | Ghost uses `data-[hovered]`/`data-[pressed]` with explicit text color |
| calendar | ✅ | Weekday header 12→14px |
| card | ✅ | `p-5`→`px-5 py-4` |
| checkbox | ✅ | Box aligned to the first line of wrapping labels |
| checkbox-group | ✅ | Reviewed |
| color-area | ✅ | Thumb `border-2` + drop shadow → `inset-ring-2` |
| color-field | ✅ | Reviewed |
| color-picker | ✅ | Re-export only |
| color-slider | ✅ | Reviewed (ring, not border) |
| color-swatch | ✅ | Reviewed |
| color-swatch-picker | ✅ | Item `rounded-lg`→`rounded-[10px]` (10 = 6 + 4) |
| color-wheel | ✅ | Thumb `border-2` + drop shadow → `inset-ring-2` |
| combo-box | ✅ | Popover `p-2`→`p-1.5` |
| date-field | ✅ | Reviewed |
| date-picker | ✅ | Example dialog `p-3`→`px-3 py-2.5` |
| date-range-picker | ✅ | Example dialog `p-3`→`px-3 py-2.5` |
| dialog | ✅ | `px-6 py-5`, styled `Heading` (16px semibold), overlay stays mounted |
| disclosure | 🟡 | `px-4 py-3`. If a collapse animation is added, keep panel content width fixed (rule 13) |
| disclosure-group | 🟡 | Same as disclosure |
| drop-zone | ✅ | `px-6 py-5` (dashed border without shadow is allowed) |
| file-trigger | ✅ | Re-export only |
| form | ✅ | Reviewed |
| grid-list | ✅ | `p-2`→`p-1.5` |
| group | ✅ | Reviewed |
| input | ✅ | Reviewed |
| label | ✅ | Reviewed |
| link | ✅ | No color transition (via `styled()`) |
| list-box | ✅ | `p-2`→`p-1.5`, section header 12→14px |
| menu | ✅ | `p-2`→`p-1.5`, section header 12→14px |
| meter | ✅ | Reviewed |
| modal | ✅ | `p-6`→`px-6 py-5` |
| navigation-tree | ✅ | `p-2`→`p-1.5`, header 12→14px |
| number-field | ✅ | Reviewed |
| popover | ✅ | Example uses styled `Heading` and tighter related text |
| preview-trigger | ✅ | Example spacing |
| progress-bar | ✅ | Reviewed |
| radio-group | ✅ | `px-2 py-1.5`, dot aligned to the first line (`items-start` + `before:my-0.5`) |
| range-calendar | ✅ | Weekday header 12→14px |
| search-field | ✅ | Reviewed |
| select | ✅ | Description/error 12→14px; focus ring color scoped to `focus-visible` |
| separator | ✅ | Reviewed |
| slider | ✅ | Reviewed |
| switch | ✅ | Track aligned to the first line; resting ring was showing the focus color (fixed) |
| table | 🟡 | Reviewed. If a sticky header is added, give it `border-b` (rule 12) |
| tabs | ✅ | Reviewed |
| tag-group | ✅ | Reviewed |
| text-area | ✅ | Reviewed |
| text-field | ✅ | Description/error 12→14px |
| time-field | ✅ | Reviewed |
| toast | ✅ | `p-4`→`px-4 py-3` |
| toggle-button | ✅ | Reviewed |
| toggle-button-group | ✅ | Group `rounded-lg`→`rounded-[10px]` (10 = 6 + 4) |
| token-field | ✅ | Reviewed |
| toolbar | ✅ | `rounded-lg p-2`→`rounded-xl p-1.5` around `rounded-md` buttons |
| tooltip | ✅ | 12→14px, `px-2.5 py-1.5` |
| tree | ✅ | `p-2`→`p-1.5`, header 12→14px |
| virtualizer | — | Layout primitives only |

All `styled()` components (about 45) also lost the global 150ms `color/background-color/box-shadow/opacity` transition (rule 7).

## Open items

1. **Docs site typography** (`apps/docs/src/styles.css`): move 9–13px text to 14px except compact chrome, remove 5 `letter-spacing` overrides, and set inline `monospace` to `0.9em`. This is out of scope for the component registry but affects the reference site.
2. **Disclosure animation**: animating the panel requires an inner wrapper with fixed width (rule 13).
3. **Visual QA**: compare light and dark screenshots of Menu, ListBox, Toolbar, ColorArea and Alert against the previous release.

## Catalog preview fix

All 62 catalog entries now have working previews. The 50 newer examples mount near the viewport and retain their state after scrolling away. Catalog cards use flat frames so raised components are not nested inside another raised surface. `tests/catalog-previews.mjs` checks loading, interaction, state retention and mobile overflow, and runs in the Pages workflow.
