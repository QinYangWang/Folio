"use client";

import { Toolbar } from "@/ui/toolbar";
import { ToggleButton } from "@/ui/toggle-button";
import { Button } from "@/ui/button";

export default function Example() {
  return (
    <Toolbar aria-label="Text formatting">
      <ToggleButton aria-label="Bold">B</ToggleButton>
      <ToggleButton aria-label="Italic">I</ToggleButton>
      <Button>Insert link</Button>
    </Toolbar>
  );
}
