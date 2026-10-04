"use client";
import { createElement, forwardRef, type ComponentType } from "react";
import { composeRenderProps } from "react-aria-components";
import { cn } from "@/lib/folio-utils";

/** Preserve the original Aria call signature (including collection generics), refs,
 * slots, render props and controlled state while supplying default Tailwind styles. */
export function styled<T extends ComponentType<any>>(
  Component: T,
  classes: string,
): T {
  const base = cn(
    "transition-[color,background-color,box-shadow,opacity] duration-150 motion-reduce:transition-none",
    classes,
  );
  const Styled = forwardRef<unknown, any>((props, ref) =>
    createElement(Component, {
      ...props,
      ref,
      className:
        typeof props.className === "function"
          ? composeRenderProps(props.className, (className) =>
              cn(base, className),
            )
          : cn(base, props.className),
    }),
  );
  Styled.displayName = `Folio(${Component.displayName || Component.name || "Component"})`;
  return Styled as unknown as T;
}
