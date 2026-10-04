"use client";
import { ProgressBar as AriaProgressBar } from "react-aria-components";
import { styled } from "@/lib/folio-styled";
export const ProgressBar = styled(
  AriaProgressBar,
  "flex flex-col gap-1.5 text-sm text-kumo-default",
);
