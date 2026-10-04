"use client";
import { Switch as AriaSwitch, type SwitchProps } from "react-aria-components";
import { motion, useReducedMotion } from "motion/react";
import { spring } from "@/lib/folio-motion";

export function Switch({ children, ...props }: SwitchProps) {
  const reduced = useReducedMotion();
  return (
    <AriaSwitch
      {...props}
      className="group flex items-start gap-3 text-[14px] leading-[20px] cursor-pointer data-[disabled]:cursor-not-allowed data-[disabled]:opacity-40"
    >
      {(state) => (
        <>
          <span className="flex h-5 w-9 shrink-0 items-center rounded-full bg-kumo-interact shadow-folio-inset ring-1 ring-kumo-line px-0.5 group-data-[selected]:bg-kumo-brand group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-kumo-focus">
            <motion.span
              aria-hidden="true"
              className="h-4 w-4 rounded-full bg-folio-on-brand bg-[image:var(--background-image-folio-knob)] shadow-folio-knob"
              initial={false}
              animate={{ x: state.isSelected ? 16 : 0 }}
              transition={reduced ? { duration: 0 } : spring}
            />
          </span>
          <span className="min-w-0 leading-[20px]">
            {typeof children === "function" ? children(state) : children}
          </span>
        </>
      )}
    </AriaSwitch>
  );
}
