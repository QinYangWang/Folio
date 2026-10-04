"use client";

import { ColorPicker } from "@/ui/color-picker";
import { ColorArea, ColorThumb } from "@/ui/color-area";
import { ColorField, Input } from "@/ui/color-field";
import { ColorSwatch } from "@/ui/color-swatch";
import { Label } from "@/ui/label";

export default function Example() {
  return (
    <ColorPicker defaultValue="#2563eb">
      <div className="flex flex-col gap-4">
        <ColorArea
          aria-label="Brand color"
          colorSpace="hsb"
          xChannel="saturation"
          yChannel="brightness"
        >
          <ColorThumb />
        </ColorArea>
        <ColorField>
          <Label>Brand color</Label>
          <Input />
        </ColorField>
        <ColorSwatch />
      </div>
    </ColorPicker>
  );
}
