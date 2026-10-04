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
              <div className="space-y-4">
                <Heading slot="title">A moment of focus</Heading>
                <p>Keyboard focus stays here until you close this dialog.</p>
                <Button onPress={close}>Close</Button>
              </div>
            )}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}
