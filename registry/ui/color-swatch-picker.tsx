"use client";
import {
  ColorSwatchPicker as AriaColorSwatchPicker,
  ColorSwatchPickerItem as AriaColorSwatchPickerItem,
  ColorSwatch as AriaColorSwatch,
} from "react-aria-components";
import { styled } from "@/lib/folio-styled";
export const ColorSwatchPicker = styled(
  AriaColorSwatchPicker,
  "flex flex-wrap gap-3",
);
export const ColorSwatchPickerItem = styled(
  AriaColorSwatchPickerItem,
  "rounded-[10px] p-1 data-[selected]:ring-2 ring-kumo-focus outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-kumo-focus data-[disabled]:opacity-40",
);
export const ColorSwatch = styled(
  AriaColorSwatch,
  "size-8 rounded-md ring-1 ring-kumo-line",
);
