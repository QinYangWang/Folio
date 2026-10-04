"use client";

import {
  NavigationTree,
  NavigationTreeItem,
  NavigationTreeItemContent,
} from "@/ui/navigation-tree";
import { Button } from "@/ui/button";

export default function Example() {
  return (
    <NavigationTree
      aria-label="Documentation"
      defaultExpandedKeys={["components"]}
    >
      <NavigationTreeItem id="components" textValue="Components">
        <NavigationTreeItemContent>
          <Button slot="chevron">›</Button>
          Components
        </NavigationTreeItemContent>
        <NavigationTreeItem
          id="button"
          textValue="Button"
          href="#/components/button"
        >
          <NavigationTreeItemContent>Button</NavigationTreeItemContent>
        </NavigationTreeItem>
        <NavigationTreeItem
          id="input"
          textValue="Input"
          href="#/components/input"
        >
          <NavigationTreeItemContent>Input</NavigationTreeItemContent>
        </NavigationTreeItem>
      </NavigationTreeItem>
    </NavigationTree>
  );
}
