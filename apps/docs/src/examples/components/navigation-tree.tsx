"use client";

import {
  NavigationTree,
  NavigationTreeItem,
  NavigationTreeItemContent,
} from "@/ui/navigation-tree";
import { Button } from "@/ui/button";

export default function Example() {
  return (
    <div className="w-64 max-w-full">
      <NavigationTree
        aria-label="Documentation"
        defaultExpandedKeys={["components"]}
      >
        <NavigationTreeItem id="components" textValue="Components">
          <NavigationTreeItemContent>
            <Button
              slot="chevron"
              variant="ghost"
              className="size-6 min-h-6 p-0"
            >
              ›
            </Button>
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
    </div>
  );
}
