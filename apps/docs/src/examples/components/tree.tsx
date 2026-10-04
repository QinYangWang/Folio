"use client";

import { Tree, TreeItem, TreeItemContent } from "@/ui/tree";
import { Button } from "@/ui/button";

export default function Example() {
  return (
    <Tree
      aria-label="Project files"
      selectionMode="single"
      defaultExpandedKeys={["components"]}
    >
      <TreeItem id="components" textValue="Components">
        <TreeItemContent>
          <Button slot="chevron">›</Button>
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
  );
}
