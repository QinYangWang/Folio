"use client";
import {
  ComboBox as AriaComboBox,
  Input as AriaInput,
  Popover as AriaPopover,
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
} from "react-aria-components";
import { styled } from "@/lib/folio-styled";
export const ComboBox = styled(
  AriaComboBox,
  "flex flex-col gap-1.5 text-sm text-kumo-default",
);
export const Input = styled(
  AriaInput,
  "min-h-9 rounded-md bg-kumo-control bg-[image:var(--background-image-folio-inset)] px-3 py-2 text-sm leading-5 text-kumo-default placeholder:text-kumo-placeholder shadow-folio-inset ring-1 ring-kumo-line outline-none focus:ring-2 focus:ring-kumo-focus disabled:opacity-40 w-full",
);
export const Popover = styled(
  AriaPopover,
  "z-50 min-w-52 rounded-xl bg-kumo-base p-2 text-sm text-kumo-default shadow-folio-card outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-kumo-focus data-[disabled]:opacity-40",
);
export const ListBox = styled(AriaListBox, "outline-none");
export const ListBoxItem = styled(
  AriaListBoxItem,
  "flex cursor-default items-center gap-2 rounded-md px-3 py-2 text-sm text-kumo-default data-[selected]:bg-kumo-info-tint data-[selected]:text-kumo-info data-[focused]:bg-kumo-tint outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-kumo-focus data-[disabled]:opacity-40",
);
