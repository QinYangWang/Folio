"use client";

import { Card } from "@/ui/card";
import { Button } from "@/ui/button";

export default function Example() {
  return (
    <Card className="max-w-sm p-6 space-y-3">
      <h3>Your next great idea</h3>
      <p>Start with a thoughtful foundation.</p>
      <Button onPress={() => (window.location.hash = "/components/button")}>
        Explore buttons
      </Button>
    </Card>
  );
}
