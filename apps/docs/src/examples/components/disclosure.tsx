"use client";

import { Disclosure, DisclosurePanel } from "@/ui/disclosure";
import { Button } from "@/ui/button";

export default function Example() {
  return (
    <Disclosure id="source">
      <Button
        slot="trigger"
        variant="ghost"
        className="w-full justify-start text-left whitespace-normal"
      >
        Do I own the source code?
      </Button>
      <DisclosurePanel>
        Yes. Install the source and adapt it to your project.
      </DisclosurePanel>
    </Disclosure>
  );
}
