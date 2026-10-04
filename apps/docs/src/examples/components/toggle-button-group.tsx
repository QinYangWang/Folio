"use client";

import { ToggleButtonGroup, ToggleButton } from "@/ui/toggle-button-group";

export default function Example() {
  return (
    <ToggleButtonGroup
      aria-label="Text alignment"
      selectionMode="single"
      defaultSelectedKeys={["left"]}
    >
      <ToggleButton id="left">Left</ToggleButton>
      <ToggleButton id="center">Center</ToggleButton>
      <ToggleButton id="right">Right</ToggleButton>
    </ToggleButtonGroup>
  );
}
