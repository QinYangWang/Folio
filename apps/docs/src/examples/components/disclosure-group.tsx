"use client";

import {
  Disclosure,
  DisclosurePanel,
  DisclosureGroup,
} from "@/ui/disclosure-group";
import { Button } from "@/ui/button";

export default function Example() {
  return (
    <DisclosureGroup>
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
      <Disclosure id="accessibility">
        <Button
          slot="trigger"
          variant="ghost"
          className="w-full justify-start text-left whitespace-normal"
        >
          Is it accessible?
        </Button>
        <DisclosurePanel>
          React Aria provides keyboard and screen reader behavior.
        </DisclosurePanel>
      </Disclosure>
    </DisclosureGroup>
  );
}
