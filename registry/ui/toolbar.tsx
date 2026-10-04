"use client";
import { Toolbar as AriaToolbar } from "react-aria-components";
import { styled } from "@/lib/folio-styled";
export const Toolbar = styled(
  AriaToolbar,
  "flex flex-wrap items-center gap-2 rounded-lg bg-kumo-base p-2 shadow-folio-card outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-kumo-focus data-[disabled]:opacity-40",
);
