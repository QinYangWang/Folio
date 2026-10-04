"use client";
import {
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  MenuSection as AriaMenuSection,
  Header as AriaHeader,
} from "react-aria-components";
import { styled } from "@/lib/folio-styled";
export const Menu = styled(
  AriaMenu,
  "rounded-xl bg-kumo-base p-2 text-sm text-kumo-default shadow-folio-card outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-kumo-focus data-[disabled]:opacity-40 min-w-48 outline-none",
);
export const MenuItem = styled(
  AriaMenuItem,
  "flex cursor-default items-center gap-2 rounded-md px-3 py-2 text-sm text-kumo-default data-[selected]:bg-kumo-info-tint data-[selected]:text-kumo-info data-[focused]:bg-kumo-tint outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-kumo-focus data-[disabled]:opacity-40",
);
export const MenuSection = styled(AriaMenuSection, "py-1");
export const Header = styled(
  AriaHeader,
  "px-3 py-2 text-xs font-medium text-kumo-subtle",
);
export { MenuTrigger, SubmenuTrigger } from "react-aria-components";
