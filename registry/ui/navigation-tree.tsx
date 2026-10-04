"use client";
import {
  NavigationTree as AriaNavigationTree,
  NavigationTreeItem as AriaNavigationTreeItem,
  NavigationTreeSection as AriaNavigationTreeSection,
  NavigationTreeHeader as AriaNavigationTreeHeader,
} from "react-aria-components";
import { styled } from "@/lib/folio-styled";
export const NavigationTree = styled(
  AriaNavigationTree,
  "rounded-xl bg-kumo-base p-1.5 text-sm text-kumo-default shadow-folio-card outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-kumo-focus data-[disabled]:opacity-40",
);
export const NavigationTreeItem = styled(
  AriaNavigationTreeItem,
  "flex cursor-default items-center gap-2 rounded-md pr-3 pl-[calc(var(--tree-item-level,0)*1rem+0.75rem)] py-2 text-sm text-kumo-default data-[selected]:bg-kumo-info-tint data-[selected]:text-kumo-info data-[focused]:bg-kumo-tint outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-kumo-focus data-[disabled]:opacity-40",
);
export { NavigationTreeItemContent } from "react-aria-components";
export const NavigationTreeSection = styled(AriaNavigationTreeSection, "py-1");
export const NavigationTreeHeader = styled(
  AriaNavigationTreeHeader,
  "px-3 pt-2 pb-1 text-sm font-medium text-kumo-subtle",
);
