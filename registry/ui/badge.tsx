import { type ComponentProps } from "react";
import { cn } from "@/lib/folio-utils";
const variants = {
  neutral: "bg-kumo-tint text-kumo-subtle",
  success: "bg-kumo-success-tint text-kumo-success",
  warning: "bg-kumo-warning-tint text-kumo-warning",
  danger: "bg-kumo-danger-tint text-kumo-danger",
  info: "bg-kumo-info-tint text-kumo-info",
};
export function Badge({
  variant = "neutral",
  className,
  ...props
}: ComponentProps<"span"> & { variant?: keyof typeof variants }) {
  return (
    <span
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-1 rounded-md px-2 py-1 text-xs leading-4",
        variants[variant],
        className,
      )}
    />
  );
}
