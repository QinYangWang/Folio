# Agent guidelines

## Skills

| Skill | Path | Source | Use for |
| --- | --- | --- | --- |
| `kumo-design` | [.agents/skills/kumo-design/SKILL.md](.agents/skills/kumo-design/SKILL.md) | [cloudflare/kumo](https://kumo-ui.com/skill/) (pinned in `skills-lock.json`) | Any change to `registry/ui`, `registry/lib`, `registry/styles` or docs examples |

Activate `kumo-design` before designing, implementing or reviewing components. Optimization status is tracked in [docs/kumo-design-progress.md](docs/kumo-design-progress.md). `npm run test:design` statically checks the machine-verifiable rules.

To update the skill, replace `SKILL.md` with the upstream file (or run `npx skills add cloudflare/kumo@kumo-design`) and refresh the hashes in `skills-lock.json`.

## How Kumo rules map to Folio

- `LayerCard` → `Card` (and other `shadow-folio-card` surfaces: Disclosure, Menu, ListBox, Tree, GridList, Toolbar, Modal). Never nest them.
- `ring ring-kumo-line` → already baked into `shadow-folio-card` as `0 0 0 1px var(--color-kumo-line)`. Do not add `border` to any element with a drop shadow (`shadow-folio-raised`, `-brand`, `-card`, `-knob`). Inset shadows (`shadow-folio-inset`) are not drop shadows.
- Content text is `text-sm` (14px / 20px). `text-xs` is reserved for compact annotations: `Badge` and `Avatar` initials.
- Concentric radii in Folio's scale: `rounded` 4px, `rounded-md` 6px, `rounded-lg` 8px, `rounded-xl` 12px. A `rounded-xl` container holding `rounded-md` items uses `p-1.5`; a `rounded-lg` container holding `rounded` items uses `p-1`.
- `styled()` in `registry/lib/folio-styled.tsx` must not add color transitions. Animate transforms/opacity with Motion, and honor `useReducedMotion`.
- Dialogs: keep `AnimatedOverlay` mounted and drive it with `isOpen`; never wrap it in `{open && …}`.
