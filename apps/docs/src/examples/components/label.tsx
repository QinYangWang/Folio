"use client";

import { Label } from "@/ui/label";
import { Input } from "@/ui/input";

export default function Example() {
  return (
    <div className="w-64 max-w-full">
      <div className="flex flex-col gap-2">
        <Label htmlFor="label-demo">Project name</Label>
        <Input id="label-demo" placeholder="Folio" />
      </div>
    </div>
  );
}
