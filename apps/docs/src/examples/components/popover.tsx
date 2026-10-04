"use client";

import { Button } from "@/ui/button";
import { Popover } from "@/ui/popover";
import { Dialog, Heading } from "react-aria-components";
import { DialogTrigger } from "@/ui/dialog";

export default function Example() {
  return (
    <DialogTrigger>
      <Button>Open details</Button>
      <Popover>
        <Dialog className="p-3 outline-none">
          <Heading slot="title">Folio workspace</Heading>
          <p className="mt-2">A shared home for your next idea.</p>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}
