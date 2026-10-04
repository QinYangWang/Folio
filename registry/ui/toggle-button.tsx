"use client";
import { ToggleButton as AriaToggleButton } from "react-aria-components";
import { styled } from "@/lib/folio-styled";
export const ToggleButton = styled(
  AriaToggleButton,
  "inline-flex min-h-9 items-center justify-center gap-2 rounded-md bg-kumo-control bg-[image:var(--background-image-folio-control)] px-3 py-2 text-sm leading-5 text-kumo-default shadow-folio-raised ring-1 ring-kumo-line data-[pressed]:shadow-folio-pressed outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-kumo-focus data-[disabled]:opacity-40 data-[selected]:bg-kumo-info-tint data-[selected]:text-kumo-info data-[selected]:shadow-folio-pressed",
);
