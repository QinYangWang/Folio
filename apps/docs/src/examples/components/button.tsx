"use client";

import { Button } from "@/ui/button";
import { useState } from "react";

export default function Example() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary" onPress={() => setCount(count + 1)}>
        Create project
      </Button>
      <Button>Cancel</Button>
      <Button isDisabled>Disabled</Button>
      <p role="status">{count} projects created</p>
    </div>
  );
}
