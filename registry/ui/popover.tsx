"use client";
import {
  Popover as AriaPopover,
  OverlayArrow as AriaOverlayArrow,
} from "react-aria-components";
import { styled } from "@/lib/folio-styled";
export const Popover = styled(
  AriaPopover,
  "z-50 min-w-48 rounded-xl bg-kumo-base p-2 text-sm text-kumo-default shadow-folio-card outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-kumo-focus data-[disabled]:opacity-40",
);
export const OverlayArrow = styled(
  AriaOverlayArrow,
  "fill-kumo-base stroke-kumo-line",
);
