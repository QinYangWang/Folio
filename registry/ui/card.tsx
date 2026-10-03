import { type ComponentProps } from "react";
import { cn } from "@/lib/folio-utils";
export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-xl bg-kumo-base bg-[image:var(--background-image-folio-card)] p-5 text-kumo-default shadow-folio-card",
        className,
      )}
    />
  );
}
