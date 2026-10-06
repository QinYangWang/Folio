"use client";

import { RadioGroup, Radio } from "@/ui/radio-group";
import { Label } from "@/ui/label";

export default function Example() {
  return (
    <div className="w-64 max-w-full">
      <RadioGroup defaultValue="monthly">
        <Label>Billing frequency</Label>
        <Radio value="monthly">Monthly</Radio>
        <Radio value="yearly">Yearly · save 20%</Radio>
      </RadioGroup>
    </div>
  );
}
