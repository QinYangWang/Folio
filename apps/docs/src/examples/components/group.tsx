"use client";

import { Group } from "@/ui/group";
import { Button } from "@/ui/button";

export default function Example() {
  return (
    <Group aria-label="Project actions" className="flex gap-2">
      <Button>Save draft</Button>
      <Button variant="primary">Publish</Button>
    </Group>
  );
}
