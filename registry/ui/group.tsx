"use client";
import { Group as AriaGroup } from "react-aria-components";
import { styled } from "@/lib/folio-styled";
export const Group = styled(
  AriaGroup,
  "flex items-center gap-2 rounded-md text-sm text-kumo-default outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-kumo-focus data-[disabled]:opacity-40",
);
