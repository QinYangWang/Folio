"use client";
import { CheckboxGroup as AriaCheckboxGroup } from "react-aria-components";
import { styled } from "@/lib/folio-styled";
export const CheckboxGroup = styled(
  AriaCheckboxGroup,
  "flex flex-col gap-1.5 text-sm text-kumo-default",
);
