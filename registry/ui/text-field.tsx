"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  TextField as AriaTextField,
  Label,
  Input,
  Text,
  FieldError,
  type TextFieldProps as AriaTextFieldProps,
} from "react-aria-components";

export function TextField({
  label,
  placeholder,
  description,
  errorMessage,
  onFocusChange,
  ...props
}: AriaTextFieldProps & {
  label: string;
  placeholder?: string;
  description?: string;
  errorMessage?: string;
}) {
  const [focused, setFocused] = useState(false);
  const reduced = useReducedMotion();
  return (
    <AriaTextField
      {...props}
      className="flex flex-col gap-1.5 text-[14px] leading-[20px]"
      onFocusChange={(value) => {
        setFocused(value);
        onFocusChange?.(value);
      }}
    >
      <Label className="font-medium">{label}</Label>
      <div className="relative">
        <Input
          placeholder={placeholder}
          className="w-full rounded-md bg-kumo-control bg-[image:var(--background-image-folio-inset)] shadow-folio-inset px-3 py-2 text-[14px] leading-[20px] text-kumo-default placeholder:text-kumo-placeholder ring-1 ring-kumo-line outline-none focus:ring-2 focus:ring-kumo-focus"
        />
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-2 bottom-0 h-0.5 origin-left rounded bg-kumo-brand"
          initial={false}
          animate={{ scaleX: focused ? 1 : 0, opacity: focused ? 1 : 0 }}
          transition={{ duration: reduced ? 0 : 0.18 }}
        />
      </div>
      {description && (
        <Text slot="description" className="text-sm text-kumo-subtle">
          {description}
        </Text>
      )}
      <FieldError className="text-sm text-kumo-danger">
        {errorMessage}
      </FieldError>
    </AriaTextField>
  );
}
