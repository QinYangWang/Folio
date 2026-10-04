"use client";
import { DropZone as AriaDropZone } from "react-aria-components";
import { styled } from "@/lib/folio-styled";
export const DropZone = styled(
  AriaDropZone,
  "flex min-h-36 flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-kumo-line bg-kumo-recessed p-6 text-sm text-kumo-subtle data-[drop-target]:border-kumo-brand data-[drop-target]:bg-kumo-info-tint outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-kumo-focus data-[disabled]:opacity-40",
);
