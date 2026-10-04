"use client";

import { Checkbox } from "@/ui/checkbox";

export default function Example() {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox defaultSelected>Email notifications</Checkbox>
      <Checkbox>Product updates</Checkbox>
      <Checkbox isDisabled>Unavailable</Checkbox>
    </div>
  );
}
