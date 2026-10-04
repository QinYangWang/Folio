"use client";

import { Form } from "@/ui/form";
import { TextField } from "@/ui/text-field";
import { Button } from "@/ui/button";
import { useState } from "react";

export default function Example() {
  const [saved, setSaved] = useState(false);
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        setSaved(true);
      }}
    >
      <TextField
        label="Email"
        name="email"
        type="email"
        isRequired
        placeholder="you@example.com"
      />
      <Button type="submit" variant="primary">
        Subscribe
      </Button>
      <p role="status">{saved && "You’re subscribed."}</p>
    </Form>
  );
}
