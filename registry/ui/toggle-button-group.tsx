"use client";
import {
  ToggleButtonGroup as AriaToggleButtonGroup,
  ToggleButton as AriaToggleButton,
} from "react-aria-components";
import { styled } from "@/lib/folio-styled";
export const ToggleButtonGroup = styled(
  AriaToggleButtonGroup,
  "flex flex-wrap gap-1 rounded-[10px] bg-kumo-recessed p-1 shadow-folio-inset",
);
export const ToggleButton = styled(
  AriaToggleButton,
  "inline-flex min-h-9 items-center justify-center gap-2 rounded-md bg-kumo-control bg-[image:var(--background-image-folio-control)] px-3 py-2 text-sm leading-5 text-kumo-default shadow-folio-raised ring-1 ring-kumo-line data-[pressed]:shadow-folio-pressed outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-kumo-focus data-[disabled]:opacity-40 data-[selected]:bg-kumo-info-tint data-[selected]:text-kumo-info",
);
