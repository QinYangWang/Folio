"use client";

import { SearchField, Input } from "@/ui/search-field";
import { Label } from "@/ui/label";
import { Button } from "@/ui/button";
import { useState } from "react";

export default function Example() {
  const [query, setQuery] = useState("");
  return (
    <div className="w-64 max-w-full">
      <SearchField value={query} onChange={setQuery}>
        <Label>Search projects</Label>
        <div className="flex gap-2">
          <Input className="min-w-0 flex-1" placeholder="Search…" />
          <Button>Clear</Button>
        </div>
        <p role="status">
          {query ? `Searching for “${query}”` : "Enter a project name"}
        </p>
      </SearchField>
    </div>
  );
}
