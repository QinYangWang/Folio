"use client";
import {
  RangeCalendar as AriaRangeCalendar,
  CalendarGrid as AriaCalendarGrid,
  CalendarGridHeader as AriaCalendarGridHeader,
  CalendarHeaderCell as AriaCalendarHeaderCell,
  CalendarGridBody as AriaCalendarGridBody,
  CalendarCell as AriaCalendarCell,
} from "react-aria-components";
import { styled } from "@/lib/folio-styled";
export const RangeCalendar = styled(
  AriaRangeCalendar,
  "flex flex-col gap-1.5 text-sm text-kumo-default",
);
export const CalendarGrid = styled(AriaCalendarGrid, "border-collapse");
export const CalendarGridHeader = styled(
  AriaCalendarGridHeader,
  "text-kumo-subtle",
);
export const CalendarHeaderCell = styled(
  AriaCalendarHeaderCell,
  "p-1 text-xs font-medium",
);
export const CalendarGridBody = styled(AriaCalendarGridBody, "");
export const CalendarCell = styled(
  AriaCalendarCell,
  "m-0.5 flex size-8 cursor-default items-center justify-center rounded-md text-sm tabular-nums data-[selected]:bg-kumo-brand data-[selected]:text-folio-on-brand data-[outside-month]:text-kumo-placeholder data-[unavailable]:line-through outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-kumo-focus data-[disabled]:opacity-40",
);
