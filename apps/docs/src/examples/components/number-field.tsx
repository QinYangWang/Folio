"use client";

import { NumberField, Input } from "@/ui/number-field";
import { Label } from "@/ui/label";
import { Button } from "@/ui/button";

export default function Example() {
  return (
    <NumberField defaultValue={2} minValue={1} maxValue={20}>
      <Label>Team members</Label>
      <div className="flex items-center gap-2">
        <Button slot="decrement" aria-label="Remove member">
          −
        </Button>
        <Input className="w-20 text-center" />
        <Button slot="increment" aria-label="Add member">
          +
        </Button>
      </div>
    </NumberField>
  );
}
