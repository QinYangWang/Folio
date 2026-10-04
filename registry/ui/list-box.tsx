"use client";
import {
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  ListBoxSection as AriaListBoxSection,
  Header as AriaHeader,
} from "react-aria-components";
import { styled } from "@/lib/folio-styled";
export const ListBox = styled(
  AriaListBox,
  "rounded-xl bg-kumo-base p-1.5 text-sm text-kumo-default shadow-folio-card outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-kumo-focus data-[disabled]:opacity-40",
);
export const ListBoxItem = styled(
  AriaListBoxItem,
  "flex cursor-default items-center gap-2 rounded-md px-3 py-2 text-sm text-kumo-default data-[selected]:bg-kumo-info-tint data-[selected]:text-kumo-info data-[focused]:bg-kumo-tint outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-kumo-focus data-[disabled]:opacity-40",
);
export const ListBoxSection = styled(AriaListBoxSection, "py-1");
export const Header = styled(
  AriaHeader,
  "px-3 pt-2 pb-1 text-sm font-medium text-kumo-subtle",
);
