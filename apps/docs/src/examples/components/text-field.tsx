"use client";

import { TextField } from "@/ui/text-field";

export default function Example() {
  return (
    <div className="w-64 max-w-full">
      <TextField
        label="Email address"
        type="email"
        placeholder="you@example.com"
        description="We’ll never share your email."
      />
    </div>
  );
}
