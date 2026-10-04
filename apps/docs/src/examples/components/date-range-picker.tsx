"use client";

import {
  DateRangePicker,
  DateInput,
  DateSegment,
} from "@/ui/date-range-picker";
import {
  RangeCalendar,
  CalendarGrid,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarGridBody,
  CalendarCell,
} from "@/ui/range-calendar";
import { Popover } from "@/ui/popover";
import { Button } from "@/ui/button";
import { Label } from "@/ui/label";
import { Dialog, Heading, Group } from "react-aria-components";

export default function Example() {
  return (
    <DateRangePicker>
      <Label>Event dates</Label>
      <Group className="flex items-center gap-2">
        <DateInput slot="start">
          {(segment) => <DateSegment segment={segment} />}
        </DateInput>
        <span aria-hidden="true">–</span>
        <DateInput slot="end">
          {(segment) => <DateSegment segment={segment} />}
        </DateInput>
        <Button aria-label="Choose dates">▦</Button>
      </Group>
      <Popover>
        <Dialog className="px-3 py-2.5 outline-none">
          <RangeCalendar>
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
          </RangeCalendar>
        </Dialog>
      </Popover>
    </DateRangePicker>
  );
}
