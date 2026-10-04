"use client";
import {
  RadioGroup as AriaRadioGroup,
  Radio as AriaRadio,
} from "react-aria-components";
import { styled } from "@/lib/folio-styled";
export const RadioGroup = styled(
  AriaRadioGroup,
  "flex flex-col gap-1.5 text-sm text-kumo-default",
);
export const Radio = styled(
  AriaRadio,
  "before:my-0.5 before:size-4 before:shrink-0 before:rounded-full before:border before:border-kumo-line before:bg-kumo-control before:shadow-folio-inset before:content-[''] data-[selected]:before:border-[5px] data-[selected]:before:border-kumo-brand group flex cursor-pointer items-start gap-2 rounded-md px-2 py-1.5 text-sm text-kumo-default data-[selected]:bg-kumo-info-tint data-[selected]:text-kumo-info outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-kumo-focus data-[disabled]:opacity-40",
);
