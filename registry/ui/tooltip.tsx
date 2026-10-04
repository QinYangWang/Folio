"use client";
import { type ReactNode } from "react";
import {
  TooltipTrigger,
  Tooltip as AriaTooltip,
  type TooltipProps,
} from "react-aria-components";
import { motion, useReducedMotion } from "motion/react";
export function Tooltip({
  children,
  content,
  delay = 400,
  ...props
}: Omit<TooltipProps, "children"> & {
  children: ReactNode;
  content: ReactNode;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <TooltipTrigger delay={delay}>
      {children}
      <AriaTooltip
        {...props}
        className="z-50 rounded-md bg-kumo-contrast px-2.5 py-1.5 text-sm text-kumo-inverse shadow-folio-raised"
      >
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.12 }}
        >
          {content}
        </motion.div>
      </AriaTooltip>
    </TooltipTrigger>
  );
}
