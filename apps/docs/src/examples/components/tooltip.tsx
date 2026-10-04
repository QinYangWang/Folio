"use client";

import { Tooltip } from "@/ui/tooltip";
import { Button } from "@/ui/button";

export default function Example() {
  return (
    <Tooltip content="Your changes are saved automatically.">
      <Button>Hover or focus for help</Button>
    </Tooltip>
  );
}
