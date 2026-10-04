"use client";

import { Select } from "@/ui/select";

export default function Example() {
  return (
    <Select
      label="Framework"
      placeholder="Select a framework"
      options={[
        { id: "react", label: "React" },
        { id: "next", label: "Next.js" },
        { id: "remix", label: "Remix" },
      ]}
    />
  );
}
