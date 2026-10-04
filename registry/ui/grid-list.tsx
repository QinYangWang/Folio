"use client";
import {
  GridList as AriaGridList,
  GridListItem as AriaGridListItem,
} from "react-aria-components";
import { styled } from "@/lib/folio-styled";
export const GridList = styled(
  AriaGridList,
  "rounded-xl bg-kumo-base p-1.5 text-sm text-kumo-default shadow-folio-card outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-kumo-focus data-[disabled]:opacity-40",
);
export const GridListItem = styled(
  AriaGridListItem,
  "flex cursor-default items-center gap-2 rounded-md px-3 py-2 text-sm text-kumo-default data-[selected]:bg-kumo-info-tint data-[selected]:text-kumo-info data-[focused]:bg-kumo-tint outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-kumo-focus data-[disabled]:opacity-40",
);
