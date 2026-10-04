"use client";

import { ComboBox, Input, Popover, ListBox, ListBoxItem } from "@/ui/combo-box";
import { Label } from "@/ui/label";
import { Button } from "@/ui/button";

export default function Example() {
  return (
    <ComboBox>
      <Label>Framework</Label>
      <div className="flex gap-2">
        <Input placeholder="Choose a framework" />
        <Button aria-label="Show frameworks">⌄</Button>
      </div>
      <Popover>
        <ListBox>
          <ListBoxItem id="react">React</ListBoxItem>
          <ListBoxItem id="next">Next.js</ListBoxItem>
          <ListBoxItem id="remix">Remix</ListBoxItem>
        </ListBox>
      </Popover>
    </ComboBox>
  );
}
