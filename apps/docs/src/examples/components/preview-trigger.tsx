"use client";

import { Button } from "@/ui/button";
import { Popover } from "@/ui/popover";
import { Dialog, Heading } from "react-aria-components";
import { PreviewTrigger } from "@/ui/preview-trigger";

export default function Example() {
  return (
    <PreviewTrigger>
      <Button>Preview project</Button>
      <Popover>
        <Dialog className="p-3 outline-none">
          <Heading slot="title">Folio workspace</Heading>
          <p className="mt-2">A shared home for your next idea.</p>
        </Dialog>
      </Popover>
    </PreviewTrigger>
  );
}
