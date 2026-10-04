"use client";
import {
  Slider as AriaSlider,
  SliderOutput as AriaSliderOutput,
  SliderTrack as AriaSliderTrack,
  SliderFill as AriaSliderFill,
  SliderThumb as AriaSliderThumb,
} from "react-aria-components";
import { styled } from "@/lib/folio-styled";
export const Slider = styled(
  AriaSlider,
  "flex flex-col gap-1.5 text-sm text-kumo-default",
);
export const SliderOutput = styled(
  AriaSliderOutput,
  "text-sm tabular-nums text-kumo-subtle",
);
export const SliderTrack = styled(
  AriaSliderTrack,
  "relative h-2 w-full rounded-full bg-kumo-fill shadow-folio-inset",
);
export const SliderFill = styled(
  AriaSliderFill,
  "absolute h-full rounded-full bg-kumo-brand",
);
export const SliderThumb = styled(
  AriaSliderThumb,
  "top-1/2 size-5 rounded-full bg-folio-on-brand shadow-folio-knob ring-1 ring-kumo-line outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-kumo-focus data-[disabled]:opacity-40",
);
