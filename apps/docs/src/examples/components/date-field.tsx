"use client";

import { DateField, DateInput, DateSegment } from "@/ui/date-field";
import { Label } from "@/ui/label";

export default function Example() {
  return (
    <DateField>
      <Label>Event date</Label>
      <DateInput>{(segment) => <DateSegment segment={segment} />}</DateInput>
    </DateField>
  );
}
