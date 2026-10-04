"use client";

import { FileTrigger } from "@/ui/file-trigger";
import { Button } from "@/ui/button";
import { useState } from "react";

export default function Example() {
  const [names, setNames] = useState("");
  return (
    <div className="space-y-3">
      <FileTrigger
        allowsMultiple
        onSelect={(files) =>
          setNames(
            Array.from(files ?? [])
              .map((file) => file.name)
              .join(", "),
          )
        }
      >
        <Button>Choose files</Button>
      </FileTrigger>
      <p role="status">{names || "No files selected"}</p>
    </div>
  );
}
