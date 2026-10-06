"use client";

import { Input } from "@/ui/input";

export default function Example() {
  return (
    <div className="w-64 max-w-full">
      <div className="flex flex-col gap-2">
        <label htmlFor="standalone-email">Email address</label>
        <Input
          id="standalone-email"
          type="email"
          placeholder="you@example.com"
        />
      </div>
    </div>
  );
}
