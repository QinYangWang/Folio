"use client";
import {
  ColorSlider as AriaColorSlider,
  SliderTrack as AriaSliderTrack,
  ColorThumb as AriaColorThumb,
} from "react-aria-components";
import { styled } from "@/lib/folio-styled";
export const ColorSlider = styled(
  AriaColorSlider,
  "flex flex-col gap-1.5 text-sm text-kumo-default",
);
export const SliderTrack = styled(
  AriaSliderTrack,
  "relative h-5 w-full rounded-full shadow-folio-inset",
);
export const ColorThumb = styled(
  AriaColorThumb,
  "top-1/2 size-5 rounded-full bg-folio-on-brand shadow-folio-knob ring-1 ring-kumo-line outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-kumo-focus data-[disabled]:opacity-40",
);
