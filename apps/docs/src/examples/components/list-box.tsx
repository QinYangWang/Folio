"use client";

import { ListBox, ListBoxItem } from "@/ui/list-box";

export default function Example() {
  return (
    <div className="w-64 max-w-full">
      <ListBox aria-label="Projects" selectionMode="multiple" className="w-full">
        <ListBoxItem id="design">Design system</ListBoxItem>
        <ListBoxItem id="website">Website</ListBoxItem>
        <ListBoxItem id="mobile">Mobile app</ListBoxItem>
      </ListBox>
    </div>
  );
}
