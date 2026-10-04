"use client";

import { Badge } from "@/ui/badge";

export default function Example() {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">In progress</Badge>
      <Badge variant="danger">Failed</Badge>
      <Badge>Draft</Badge>
    </div>
  );
}
