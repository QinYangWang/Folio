"use client";
import {
  ColorArea as AriaColorArea,
  ColorThumb as AriaColorThumb,
} from "react-aria-components";
import { styled } from "@/lib/folio-styled";
export const ColorArea = styled(
  AriaColorArea,
  "relative size-48 rounded-lg shadow-folio-inset data-[disabled]:opacity-40",
);
export const ColorThumb = styled(
  AriaColorThumb,
  "size-5 rounded-full border-2 border-folio-on-brand shadow-folio-raised outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-kumo-focus data-[disabled]:opacity-40",
);
