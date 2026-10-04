"use client";
import {
  TagGroup as AriaTagGroup,
  TagList as AriaTagList,
  Tag as AriaTag,
} from "react-aria-components";
import { styled } from "@/lib/folio-styled";
export const TagGroup = styled(
  AriaTagGroup,
  "flex flex-col gap-1.5 text-sm text-kumo-default",
);
export const TagList = styled(AriaTagList, "flex flex-wrap gap-2");
export const Tag = styled(
  AriaTag,
  "flex items-center gap-2 rounded-md bg-kumo-tint px-2 py-1 text-sm text-kumo-default data-[selected]:bg-kumo-info-tint outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-kumo-focus data-[disabled]:opacity-40",
);
