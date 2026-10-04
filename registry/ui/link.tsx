"use client";
import { Link as AriaLink } from "react-aria-components";
import { styled } from "@/lib/folio-styled";
export const Link = styled(
  AriaLink,
  "inline-flex items-center gap-1 rounded text-sm text-kumo-link underline-offset-4 data-[hovered]:underline outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-kumo-focus data-[disabled]:opacity-40",
);
