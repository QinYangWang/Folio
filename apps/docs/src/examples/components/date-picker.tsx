"use client";

import { DatePicker, DateInput, DateSegment } from "@/ui/date-picker";
import {
  Calendar,
  CalendarGrid,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarGridBody,
  CalendarCell,
} from "@/ui/calendar";
import { Popover } from "@/ui/popover";
import { Button } from "@/ui/button";
import { Label } from "@/ui/label";
import { Dialog, Heading, Group } from "react-aria-components";

export default function Example() {
  return (
    <DatePicker>
      <Label>Event dates</Label>
      <Group className="flex items-center gap-2">
        <DateInput>{(segment) => <DateSegment segment={segment} />}</DateInput>
        <Button aria-label="Choose dates">▦</Button>
      </Group>
      <Popover>
        <Dialog className="p-3 outline-none">
          <Calendar>
            <div className="flex items-center justify-between gap-3">
              <Button slot="previous" aria-label="Previous month">
                ‹
              </Button>
              <Heading />
              <Button slot="next" aria-label="Next month">
                ›
              </Button>
            </div>
            <CalendarGrid>
              <CalendarGridHeader>
                {(day) => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
              </CalendarGridHeader>
              <CalendarGridBody>
                {(date) => <CalendarCell date={date} />}
              </CalendarGridBody>
            </CalendarGrid>
          </Calendar>
        </Dialog>
      </Popover>
    </DatePicker>
  );
}
