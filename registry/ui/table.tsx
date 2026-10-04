"use client";
import {
  Table as AriaTable,
  TableHeader as AriaTableHeader,
  Column as AriaColumn,
  TableBody as AriaTableBody,
  Row as AriaRow,
  Cell as AriaCell,
} from "react-aria-components";
import { styled } from "@/lib/folio-styled";
export const Table = styled(
  AriaTable,
  "w-full border-collapse text-left text-sm text-kumo-default outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-kumo-focus data-[disabled]:opacity-40",
);
export const TableHeader = styled(AriaTableHeader, "bg-kumo-recessed");
export const Column = styled(
  AriaColumn,
  "border-b border-kumo-hairline px-3 py-2 font-medium outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-kumo-focus data-[disabled]:opacity-40",
);
export const TableBody = styled(AriaTableBody, "");
export const Row = styled(
  AriaRow,
  "border-b border-kumo-hairline data-[selected]:bg-kumo-info-tint outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-kumo-focus data-[disabled]:opacity-40",
);
export const Cell = styled(
  AriaCell,
  "px-3 py-2 outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-kumo-focus data-[disabled]:opacity-40",
);
