"use client";
import {
  TokenField as AriaTokenField,
  TokenInput as AriaTokenInput,
  Token as AriaToken,
} from "react-aria-components";
import { styled } from "@/lib/folio-styled";
export const TokenField = styled(
  AriaTokenField,
  "flex flex-col gap-1.5 text-sm text-kumo-default",
);
export { TokenFieldValue } from "react-aria-components";
export const TokenInput = styled(
  AriaTokenInput,
  "min-h-9 rounded-md bg-kumo-control bg-[image:var(--background-image-folio-inset)] px-3 py-2 text-sm leading-5 text-kumo-default placeholder:text-kumo-placeholder shadow-folio-inset ring-1 ring-kumo-line outline-none focus:ring-2 focus:ring-kumo-focus disabled:opacity-40",
);
export const Token = styled(
  AriaToken,
  "inline-flex cursor-default items-center gap-2 rounded-md px-3 py-2 text-sm text-kumo-default data-[selected]:bg-kumo-info-tint data-[selected]:text-kumo-info data-[focused]:bg-kumo-tint outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-kumo-focus data-[disabled]:opacity-40 bg-kumo-tint",
);
