"use client";
import { TextArea as AriaTextArea } from "react-aria-components";
import { styled } from "@/lib/folio-styled";
export const TextArea = styled(
  AriaTextArea,
  "min-h-9 rounded-md bg-kumo-control bg-[image:var(--background-image-folio-inset)] px-3 py-2 text-sm leading-5 text-kumo-default placeholder:text-kumo-placeholder shadow-folio-inset ring-1 ring-kumo-line outline-none focus:ring-2 focus:ring-kumo-focus disabled:opacity-40 min-h-24 resize-y",
);
