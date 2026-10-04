"use client";

import { GridList, GridListItem } from "@/ui/grid-list";

export default function Example() {
  return (
    <GridList aria-label="Projects" selectionMode="multiple" className="w-64">
      <GridListItem id="design">Design system</GridListItem>
      <GridListItem id="website">Website</GridListItem>
      <GridListItem id="mobile">Mobile app</GridListItem>
    </GridList>
  );
}
