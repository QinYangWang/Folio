"use client";

import { ColorWheel, ColorWheelTrack, ColorThumb } from "@/ui/color-wheel";

export default function Example() {
  return (
    <ColorWheel
      outerRadius={96}
      innerRadius={72}
      aria-label="Hue"
      defaultValue="hsl(220, 80%, 60%)"
    >
      <ColorWheelTrack />
      <ColorThumb />
    </ColorWheel>
  );
}
