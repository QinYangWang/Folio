"use client";

import { ColorSwatch } from "@/ui/color-swatch";

export default function Example() {
  return (
    <div className="flex gap-3">
      <ColorSwatch color="#2563eb" />
      <ColorSwatch color="#7c3aed" />
      <ColorSwatch color="#dc2626" />
      <ColorSwatch color="#16a34a" />
    </div>
  );
}
