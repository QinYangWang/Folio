"use client";

import { TextArea } from "@/ui/text-area";
import { TextField, Label, Text } from "react-aria-components";

export default function Example() {
  return (
    <TextField className="flex flex-col gap-2">
      <Label>Project description</Label>
      <TextArea placeholder="What are you building?" rows={4} />
      <Text slot="description">Tell your team a little about the project.</Text>
    </TextField>
  );
}
