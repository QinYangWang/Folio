"use client";

import { Card } from "@/ui/card";
import { Button } from "@/ui/button";

export default function Example() {
  return (
    <Card className="grid max-w-sm justify-items-start gap-4">
      <div className="grid gap-1">
        <h3 className="text-base leading-6 font-semibold">
          Your next great idea
        </h3>
        <p className="text-sm text-kumo-subtle">
          Start with a thoughtful foundation.
        </p>
      </div>
      <Button onPress={() => (window.location.hash = "/components/button")}>
        Explore buttons
      </Button>
    </Card>
  );
}
