"use client";
import { useState, type ComponentProps } from "react";
import { cn } from "@/lib/folio-utils";
export function Avatar({
  src,
  name,
  className,
  ...props
}: Omit<ComponentProps<"span">, "children"> & { name: string; src?: string }) {
  const [failedSource, setFailedSource] = useState<string>();
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  return (
    <span
      {...props}
      role="img"
      aria-label={name}
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-kumo-tint text-xs text-kumo-default",
        className,
      )}
    >
      {src && failedSource !== src ? (
        <img
          src={src}
          alt=""
          className="size-full object-cover"
          onError={() => setFailedSource(src)}
        />
      ) : (
        initials
      )}
    </span>
  );
}
