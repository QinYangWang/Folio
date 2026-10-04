"use client";

import { ListBox, ListBoxItem } from "@/ui/list-box";

export default function Example() {
  return (
    <ListBox aria-label="Projects" selectionMode="multiple" className="w-64">
      <ListBoxItem id="design">Design system</ListBoxItem>
      <ListBoxItem id="website">Website</ListBoxItem>
      <ListBoxItem id="mobile">Mobile app</ListBoxItem>
    </ListBox>
  );
}
