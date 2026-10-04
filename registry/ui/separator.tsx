"use client";
import { Separator as AriaSeparator } from "react-aria-components";
import { styled } from "@/lib/folio-styled";
export const Separator = styled(
  AriaSeparator,
  "my-3 border-0 bg-kumo-hairline h-px w-full data-[orientation=vertical]:h-6 data-[orientation=vertical]:w-px",
);
