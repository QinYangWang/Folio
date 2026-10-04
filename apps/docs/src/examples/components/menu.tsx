"use client";

import { MenuTrigger, Menu, MenuItem } from "@/ui/menu";
import { Popover } from "@/ui/popover";
import { Button } from "@/ui/button";
import { useState } from "react";

export default function Example() {
  const [action, setAction] = useState("");
  return (
    <div className="space-y-3">
      <MenuTrigger>
        <Button>Project actions</Button>
        <Popover>
          <Menu onAction={(key) => setAction(String(key))}>
            <MenuItem id="Edit">Edit</MenuItem>
            <MenuItem id="Duplicate">Duplicate</MenuItem>
            <MenuItem id="Archive">Archive</MenuItem>
          </Menu>
        </Popover>
      </MenuTrigger>
      <p role="status">{action && `${action} selected`}</p>
    </div>
  );
}
