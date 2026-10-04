"use client";
import { Toolbar as AriaToolbar } from "react-aria-components";
import { styled } from "@/lib/folio-styled";
export const Toolbar = styled(
  AriaToolbar,
  "flex flex-wrap items-center gap-1.5 rounded-xl bg-kumo-base p-1.5 shadow-folio-card outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-kumo-focus data-[disabled]:opacity-40",
);
