"use client";
import { useId } from "react";
import {
  Tabs as AriaTabs,
  TabList as AriaTabList,
  Tab as AriaTab,
  TabPanel as AriaTabPanel,
  type TabsProps,
  type TabListProps,
  type TabProps,
  type TabPanelProps,
} from "react-aria-components";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/folio-utils";
export function Tabs(props: TabsProps) {
  const id = useId();
  return (
    <LayoutGroup id={id}>
      <AriaTabs {...props} />
    </LayoutGroup>
  );
}
export function TabList<T extends object>({
  className,
  ...props
}: TabListProps<T>) {
  return (
    <AriaTabList
      {...props}
      className={cn(
        "flex border-b border-kumo-hairline",
        typeof className === "string" ? className : undefined,
      )}
    />
  );
}
export function Tab({ children, className, ...props }: TabProps) {
  const reduced = useReducedMotion();
  return (
    <AriaTab
      {...props}
      className={(state) =>
        cn(
          "relative cursor-pointer px-3 py-2 text-sm text-kumo-subtle outline-none data-[selected]:text-kumo-link data-[focus-visible]:ring-2 ring-kumo-focus data-[disabled]:opacity-40",
          typeof className === "function" ? className(state) : className,
        )
      }
    >
      {(state) => (
        <>
          {typeof children === "function" ? children(state) : children}
          {state.isSelected && (
            <motion.span
              className="tab-indicator absolute inset-x-0 -bottom-px h-0.5 bg-kumo-brand"
              layoutId="tab-underline"
              transition={{ duration: reduced ? 0 : 0.2 }}
            />
          )}
        </>
      )}
    </AriaTab>
  );
}
export function TabPanel({ children, className, ...props }: TabPanelProps) {
  const reduced = useReducedMotion();
  return (
    <AriaTabPanel
      {...props}
      className={(state) =>
        cn(
          "py-4 text-sm text-kumo-default outline-none focus-visible:ring-2 ring-kumo-focus",
          typeof className === "function" ? className(state) : className,
        )
      }
    >
      {(state) => (
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.15 }}
        >
          {typeof children === "function" ? children(state) : children}
        </motion.div>
      )}
    </AriaTabPanel>
  );
}
