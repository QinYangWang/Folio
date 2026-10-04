"use client";

import { DropZone } from "@/ui/drop-zone";
import { FileTrigger } from "@/ui/file-trigger";
import { Text } from "react-aria-components";
import { Button } from "@/ui/button";
import { useState } from "react";

export default function Example() {
  const [count, setCount] = useState(0);
  return (
    <DropZone onDrop={(event) => setCount(event.items.length)}>
      <Text slot="label">Drop files here</Text>
      <FileTrigger
        allowsMultiple
        onSelect={(files) => setCount(files?.length ?? 0)}
      >
        <Button>Choose files</Button>
      </FileTrigger>
      <p role="status">{count} files selected</p>
    </DropZone>
  );
}
