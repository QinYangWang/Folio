"use client";

import { Virtualizer, ListLayout } from "@/ui/virtualizer";
import { ListBox, ListBoxItem } from "@/ui/list-box";

export default function Example() {
  const items = Array.from({ length: 1000 }, (_, id) => ({
    id,
    name: `Project ${id + 1}`,
  }));
  return (
    <Virtualizer layout={ListLayout} layoutOptions={{ rowHeight: 40 }}>
      <ListBox
        aria-label="All projects"
        selectionMode="single"
        items={items}
        className="h-64 w-64 overflow-auto"
      >
        {(item) => <ListBoxItem id={item.id}>{item.name}</ListBoxItem>}
      </ListBox>
    </Virtualizer>
  );
}
