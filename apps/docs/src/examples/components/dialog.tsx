"use client";

import { useState } from "react";
import { Button } from "@/ui/button";
import { AnimatedOverlay, AnimatedModal, Dialog, Heading } from "@/ui/dialog";
export default function Example() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onPress={() => setOpen(true)}>Open dialog</Button>
      <AnimatedOverlay isOpen={open} onOpenChange={setOpen}>
        <AnimatedModal>
          <Dialog>
            {({ close }) => (
              <div className="grid justify-items-start gap-4">
                <div className="grid gap-1">
                  <Heading slot="title">A moment of focus</Heading>
                  <p className="text-kumo-subtle">
                    Keyboard focus stays here until you close this dialog.
                  </p>
                </div>
                <Button onPress={close}>Close</Button>
              </div>
            )}
          </Dialog>
        </AnimatedModal>
      </AnimatedOverlay>
    </>
  );
}
