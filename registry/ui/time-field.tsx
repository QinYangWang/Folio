"use client";
import {
  TimeField as AriaTimeField,
  DateInput as AriaDateInput,
  DateSegment as AriaDateSegment,
} from "react-aria-components";
import { styled } from "@/lib/folio-styled";
export const TimeField = styled(
  AriaTimeField,
  "flex flex-col gap-1.5 text-sm text-kumo-default",
);
export const DateInput = styled(
  AriaDateInput,
  "flex items-center min-h-9 rounded-md bg-kumo-control bg-[image:var(--background-image-folio-inset)] px-3 py-2 text-sm leading-5 text-kumo-default placeholder:text-kumo-placeholder shadow-folio-inset ring-1 ring-kumo-line outline-none focus:ring-2 focus:ring-kumo-focus disabled:opacity-40",
);
export const DateSegment = styled(
  AriaDateSegment,
  "rounded px-0.5 tabular-nums data-[placeholder]:text-kumo-placeholder focus:bg-kumo-brand focus:text-folio-on-brand outline-none",
);
