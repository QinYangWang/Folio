"use client";

import { ToastQueue, ToastRegion, Toast, ToastContent } from "@/ui/toast";
import { Text } from "react-aria-components";
import { Button } from "@/ui/button";
import { useState } from "react";

export default function Example() {
  const [queue] = useState(
    () =>
      new ToastQueue<{ title: string; description: string }>({
        maxVisibleToasts: 3,
      }),
  );
  return (
    <>
      <Button
        onPress={() =>
          queue.add({
            title: "Changes saved",
            description: "Your project is up to date.",
          })
        }
      >
        Show notification
      </Button>
      <ToastRegion queue={queue}>
        {({ toast }) => (
          <Toast toast={toast}>
            <ToastContent>
              <Text slot="title">{toast.content.title}</Text>
              <Text slot="description">{toast.content.description}</Text>
            </ToastContent>
            <Button slot="close" aria-label="Dismiss notification">
              ×
            </Button>
          </Toast>
        )}
      </ToastRegion>
    </>
  );
}
