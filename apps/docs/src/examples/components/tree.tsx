"use client";

import { Tree, TreeItem, TreeItemContent } from "@/ui/tree";
import { Button } from "@/ui/button";

export default function Example() {
  return (
    <div className="w-64 max-w-full">
      <Tree
        aria-label="Project files"
        selectionMode="single"
        defaultExpandedKeys={["components"]}
      >
        <TreeItem id="components" textValue="Components">
          <TreeItemContent>
            <Button
              slot="chevron"
              variant="ghost"
              className="size-6 min-h-6 p-0"
            >
              ›
            </Button>
            Components
          </TreeItemContent>
          <TreeItem id="button" textValue="Button">
            <TreeItemContent>Button</TreeItemContent>
          </TreeItem>
          <TreeItem id="input" textValue="Input">
            <TreeItemContent>Input</TreeItemContent>
          </TreeItem>
        </TreeItem>
      </Tree>
    </div>
  );
}
