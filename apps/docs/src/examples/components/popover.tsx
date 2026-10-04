"use client";

import { Button } from "@/ui/button";
import { Popover } from "@/ui/popover";
import { Dialog } from "react-aria-components";
import { DialogTrigger, Heading } from "@/ui/dialog";

export default function Example() {
  return (
    <DialogTrigger>
      <Button>Open details</Button>
      <Popover>
        <Dialog className="px-3 py-2.5 outline-none">
          <Heading slot="title">Folio workspace</Heading>
          <p className="mt-1 text-kumo-subtle">A shared home for your next idea.</p>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}
