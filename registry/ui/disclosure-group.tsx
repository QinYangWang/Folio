"use client";
import {
  DisclosureGroup as AriaDisclosureGroup,
  Disclosure as AriaDisclosure,
  DisclosurePanel as AriaDisclosurePanel,
} from "react-aria-components";
import { styled } from "@/lib/folio-styled";
export const DisclosureGroup = styled(
  AriaDisclosureGroup,
  "flex flex-col gap-3",
);
export const Disclosure = styled(
  AriaDisclosure,
  "rounded-lg bg-kumo-base p-4 shadow-folio-card",
);
export const DisclosurePanel = styled(
  AriaDisclosurePanel,
  "pt-3 text-sm text-kumo-subtle",
);
