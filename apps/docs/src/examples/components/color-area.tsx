"use client";

import { ColorArea, ColorThumb } from "@/ui/color-area";

export default function Example() {
  return (
    <ColorArea
      aria-label="Brand color"
      colorSpace="hsb"
      xChannel="saturation"
      yChannel="brightness"
      defaultValue="hsb(220, 80%, 90%)"
    >
      <ColorThumb />
    </ColorArea>
  );
}
