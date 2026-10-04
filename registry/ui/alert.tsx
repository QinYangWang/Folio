import { type ReactNode, type ComponentProps } from "react";
import { cn } from "@/lib/folio-utils";
const variants = {
  info: "bg-kumo-info-tint text-kumo-info",
  success: "bg-kumo-success-tint text-kumo-success",
  warning: "bg-kumo-warning-tint text-kumo-warning",
  danger: "bg-kumo-danger-tint text-kumo-danger",
};
export function Alert({
  title,
  children,
  icon,
  variant = "info",
  className,
  ...props
}: Omit<ComponentProps<"div">, "title"> & {
  title: ReactNode;
  icon?: ReactNode;
  variant?: keyof typeof variants;
}) {
  return (
    <div
      role={variant === "danger" ? "alert" : "status"}
      {...props}
      className={cn(
        "flex items-start gap-2.5 rounded-lg px-3 py-2.5 text-sm leading-5",
        variants[variant],
        className,
      )}
    >
      {icon && (
        <span
          className="flex h-lh shrink-0 items-center [&>svg]:size-4"
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      <div className="grid min-w-0 gap-0.5">
        <div className="font-medium">{title}</div>
        {children && <div>{children}</div>}
      </div>
    </div>
  );
}
