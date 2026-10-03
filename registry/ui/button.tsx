"use client";
import { Button as AriaButton, type ButtonProps } from "react-aria-components";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/folio-utils";
import { spring } from "@/lib/folio-motion";

export function Button({
  className,
  variant = "secondary",
  children,
  ...props
}: ButtonProps & { variant?: "primary" | "secondary" | "ghost" }) {
  const reduced = useReducedMotion();
  return (
    <AriaButton
      {...props}
      className={(state) =>
        cn(
          "inline-flex min-h-9 items-center justify-center gap-2 rounded-md px-3 py-2 text-[14px] leading-[20px] font-medium cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-kumo-focus disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:bg-none",
          variant === "primary"
            ? "bg-kumo-brand bg-[image:var(--background-image-folio-brand)] text-folio-on-brand shadow-folio-brand ring-1 ring-kumo-brand-hover data-[hovered]:brightness-105 data-[pressed]:bg-none data-[pressed]:shadow-folio-pressed data-[pressed]:translate-y-px motion-reduce:data-[pressed]:translate-y-0"
            : variant === "ghost"
              ? "hover:bg-kumo-tint"
              : "bg-kumo-control bg-[image:var(--background-image-folio-control)] text-kumo-default shadow-folio-raised ring-1 ring-kumo-line data-[hovered]:bg-kumo-fill-hover data-[pressed]:bg-none data-[pressed]:shadow-folio-pressed data-[pressed]:translate-y-px motion-reduce:data-[pressed]:translate-y-0",
          typeof className === "function" ? className(state) : className,
        )
      }
    >
      {(state) => (
        <motion.span
          className="inline-flex items-center justify-center gap-2 leading-[20px] [&>svg]:block [&>svg]:size-4 [&>svg]:shrink-0"
          initial={false}
          animate={{
            scale: state.isPressed && !state.isDisabled && !reduced ? 0.96 : 1,
          }}
          transition={reduced ? { duration: 0 } : spring}
        >
          {typeof children === "function" ? children(state) : children}
        </motion.span>
      )}
    </AriaButton>
  );
}
