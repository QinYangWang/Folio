"use client";

import { ColorField, Input } from "@/ui/color-field";
import { Label } from "@/ui/label";

export default function Example() {
  return (
    <ColorField defaultValue="#2563eb">
      <Label>Brand color</Label>
      <Input />
    </ColorField>
  );
}
