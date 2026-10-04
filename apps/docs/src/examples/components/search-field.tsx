"use client";

import { SearchField, Input } from "@/ui/search-field";
import { Label } from "@/ui/label";
import { Button } from "@/ui/button";
import { useState } from "react";

export default function Example() {
  const [query, setQuery] = useState("");
  return (
    <SearchField value={query} onChange={setQuery}>
      <Label>Search projects</Label>
      <div className="flex gap-2">
        <Input placeholder="Search…" />
        <Button>Clear</Button>
      </div>
      <p role="status">
        {query ? `Searching for “${query}”` : "Enter a project name"}
      </p>
    </SearchField>
  );
}
