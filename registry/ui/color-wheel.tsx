"use client";
import {
  ColorWheel as AriaColorWheel,
  ColorWheelTrack as AriaColorWheelTrack,
  ColorThumb as AriaColorThumb,
} from "react-aria-components";
import { styled } from "@/lib/folio-styled";
export const ColorWheel = styled(AriaColorWheel, "relative size-48");
export const ColorWheelTrack = styled(
  AriaColorWheelTrack,
  "size-full rounded-full shadow-folio-inset",
);
export const ColorThumb = styled(
  AriaColorThumb,
  "size-5 rounded-full border-2 border-folio-on-brand shadow-folio-knob outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-kumo-focus data-[disabled]:opacity-40",
);
