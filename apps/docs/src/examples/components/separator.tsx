"use client";

import { Separator } from "@/ui/separator";

export default function Example() {
  return (
    <div className="w-64 max-w-full">
      <div className="w-full space-y-4">
        <p>Workspace settings</p>
        <Separator />
        <p>Account settings</p>
      </div>
    </div>
  );
}
