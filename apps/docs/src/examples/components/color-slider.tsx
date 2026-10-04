"use client";

import { ColorSlider, SliderTrack, ColorThumb } from "@/ui/color-slider";
import { Label } from "@/ui/label";

export default function Example() {
  return (
    <ColorSlider
      channel="hue"
      defaultValue="hsl(220, 80%, 60%)"
      className="w-64"
    >
      <Label>Hue</Label>
      <SliderTrack>
        <ColorThumb />
      </SliderTrack>
    </ColorSlider>
  );
}
