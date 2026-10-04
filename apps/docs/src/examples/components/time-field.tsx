"use client";

import { TimeField, DateInput, DateSegment } from "@/ui/time-field";
import { Label } from "@/ui/label";

export default function Example() {
  return (
    <TimeField>
      <Label>Meeting time</Label>
      <DateInput>{(segment) => <DateSegment segment={segment} />}</DateInput>
    </TimeField>
  );
}
