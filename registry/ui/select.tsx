"use client";
import {
  Select as AriaSelect,
  Label,
  Button,
  SelectValue,
  Popover,
  ListBox,
  ListBoxItem,
  Text,
  FieldError,
  type SelectProps as AriaSelectProps,
} from "react-aria-components";
import { ChevronDown, Check } from "lucide-react";
export interface SelectOption {
  id: string;
  label: string;
  isDisabled?: boolean;
}
export function Select({
  label,
  options,
  description,
  errorMessage,
  ...props
}: Omit<AriaSelectProps<SelectOption>, "children"> & {
  label: string;
  options: SelectOption[];
  description?: string;
  errorMessage?: string;
}) {
  return (
    <AriaSelect
      {...props}
      disabledKeys={
        props.disabledKeys ??
        options.filter((x) => x.isDisabled).map((x) => x.id)
      }
      className="flex w-full flex-col gap-1.5 text-sm text-kumo-default"
    >
      <Label className="font-medium">{label}</Label>
      <Button className="flex min-h-9 items-center justify-between gap-3 rounded-md bg-kumo-control bg-[image:var(--background-image-folio-inset)] px-3 py-2 text-left shadow-folio-inset ring-1 ring-kumo-line outline-none data-[focus-visible]:ring-2 ring-kumo-focus data-[disabled]:opacity-40">
        <SelectValue />
        <ChevronDown size={16} aria-hidden="true" />
      </Button>
      {description && (
        <Text slot="description" className="text-xs text-kumo-subtle">
          {description}
        </Text>
      )}
      <FieldError className="text-xs text-kumo-danger">
        {errorMessage}
      </FieldError>
      <Popover className="z-50 w-[var(--trigger-width)] min-w-44 rounded-lg bg-kumo-base p-1 text-kumo-default shadow-folio-card">
        <ListBox items={options} className="outline-none">
          {(option) => (
            <ListBoxItem
              id={option.id}
              textValue={option.label}
              className="flex cursor-pointer items-center justify-between gap-4 rounded px-3 py-2 text-sm outline-none data-[focused]:bg-kumo-tint data-[disabled]:opacity-40"
            >
              {({ isSelected }) => (
                <>
                  {option.label}
                  {isSelected && <Check size={14} />}
                </>
              )}
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
}
