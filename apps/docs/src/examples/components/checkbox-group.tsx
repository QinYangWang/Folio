"use client";

import { CheckboxGroup } from "@/ui/checkbox-group";
import { Checkbox } from "@/ui/checkbox";
import { Label } from "@/ui/label";

export default function Example() {
  return (
    <CheckboxGroup defaultValue={["design"]}>
      <Label>Interests</Label>
      <Checkbox value="design">Design</Checkbox>
      <Checkbox value="engineering">Engineering</Checkbox>
      <Checkbox value="research">Research</Checkbox>
    </CheckboxGroup>
  );
}
