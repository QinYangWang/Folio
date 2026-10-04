"use client";

import { Button } from "@/ui/button";
import { DialogTrigger, Dialog, Heading } from "@/ui/dialog";
import { ModalOverlay, Modal } from "@/ui/modal";

export default function Example() {
  return (
    <DialogTrigger>
      <Button>Open modal</Button>
      <ModalOverlay isDismissable>
        <Modal>
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
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}
