"use client";
import {
  NumberField as AriaNumberField,
  Input as AriaInput,
} from "react-aria-components";
import { styled } from "@/lib/folio-styled";
export const NumberField = styled(
  AriaNumberField,
  "flex flex-col gap-1.5 text-sm text-kumo-default",
);
export const Input = styled(
  AriaInput,
  "min-h-9 rounded-md bg-kumo-control bg-[image:var(--background-image-folio-inset)] px-3 py-2 text-sm leading-5 text-kumo-default placeholder:text-kumo-placeholder shadow-folio-inset ring-1 ring-kumo-line outline-none focus:ring-2 focus:ring-kumo-focus disabled:opacity-40 w-24 text-center",
);
