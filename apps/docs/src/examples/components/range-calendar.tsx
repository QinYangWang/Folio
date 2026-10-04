"use client";

import {
  RangeCalendar,
  CalendarGrid,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarGridBody,
  CalendarCell,
} from "@/ui/range-calendar";
import { Button } from "@/ui/button";
import { Heading } from "react-aria-components";

export default function Example() {
  return (
    <RangeCalendar aria-label="Event dates">
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
  );
}
