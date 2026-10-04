"use client";

import {
  ColorSwatchPicker,
  ColorSwatchPickerItem,
  ColorSwatch,
} from "@/ui/color-swatch-picker";

export default function Example() {
  return (
    <ColorSwatchPicker aria-label="Brand color" defaultValue="#2563eb">
      <ColorSwatchPickerItem color="#2563eb">
        <ColorSwatch />
      </ColorSwatchPickerItem>
      <ColorSwatchPickerItem color="#7c3aed">
        <ColorSwatch />
      </ColorSwatchPickerItem>
      <ColorSwatchPickerItem color="#dc2626">
        <ColorSwatch />
      </ColorSwatchPickerItem>
      <ColorSwatchPickerItem color="#16a34a">
        <ColorSwatch />
      </ColorSwatchPickerItem>
    </ColorSwatchPicker>
  );
}
