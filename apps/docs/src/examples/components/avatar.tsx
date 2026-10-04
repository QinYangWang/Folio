"use client";

import { Avatar } from "@/ui/avatar";

export default function Example() {
  return (
    <div className="flex gap-3">
      <Avatar name="Jane Doe" />
      <Avatar name="Alex Kim" />
      <Avatar name="Morgan Lee" />
    </div>
  );
}
