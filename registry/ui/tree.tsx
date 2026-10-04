"use client";
import {
  Tree as AriaTree,
  TreeItem as AriaTreeItem,
  TreeSection as AriaTreeSection,
  TreeHeader as AriaTreeHeader,
} from "react-aria-components";
import { styled } from "@/lib/folio-styled";
export const Tree = styled(
  AriaTree,
  "rounded-xl bg-kumo-base p-2 text-sm text-kumo-default shadow-folio-card outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-kumo-focus data-[disabled]:opacity-40",
);
export const TreeItem = styled(
  AriaTreeItem,
  "flex cursor-default items-center gap-2 rounded-md pr-3 pl-[calc(var(--tree-item-level,0)*1rem+0.75rem)] py-2 text-sm text-kumo-default data-[selected]:bg-kumo-info-tint data-[selected]:text-kumo-info data-[focused]:bg-kumo-tint outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-kumo-focus data-[disabled]:opacity-40",
);
export { TreeItemContent } from "react-aria-components";
export const TreeSection = styled(AriaTreeSection, "py-1");
export const TreeHeader = styled(
  AriaTreeHeader,
  "px-3 py-2 text-xs text-kumo-subtle",
);
