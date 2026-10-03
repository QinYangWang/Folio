"use client";
import {
  Checkbox as AriaCheckbox,
  type CheckboxProps,
} from "react-aria-components";
import { motion, useReducedMotion } from "motion/react";

export function Checkbox({ children, ...props }: CheckboxProps) {
  const reduced = useReducedMotion();
  return (
    <AriaCheckbox
      {...props}
      className="group flex items-center gap-2.5 text-[14px] leading-[20px] cursor-pointer data-[disabled]:cursor-not-allowed data-[disabled]:opacity-40"
    >
      {(state) => (
        <>
          <span className="flex size-4 shrink-0 items-center justify-center rounded bg-kumo-control bg-[image:var(--background-image-folio-inset)] shadow-folio-inset group-data-[selected]:bg-none group-data-[selected]:shadow-folio-brand group-data-[indeterminate]:bg-none ring-1 ring-kumo-line group-data-[selected]:bg-kumo-brand group-data-[selected]:ring-kumo-brand group-data-[indeterminate]:bg-kumo-brand group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-kumo-focus">
            <motion.svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="size-3 text-folio-on-brand"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.path
                d={state.isIndeterminate ? "M3 8h10" : "M3 8l3 3 7-7"}
                initial={false}
                animate={{
                  pathLength: state.isSelected || state.isIndeterminate ? 1 : 0,
                  opacity: state.isSelected || state.isIndeterminate ? 1 : 0,
                }}
                transition={{ duration: reduced ? 0 : 0.16, ease: "easeOut" }}
              />
            </motion.svg>
          </span>
          <span className="min-w-0 leading-[20px]">
            {typeof children === "function" ? children(state) : children}
          </span>
        </>
      )}
    </AriaCheckbox>
  );
}
