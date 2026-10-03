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
        "flex items-start gap-3 rounded-lg p-3 text-sm",
        variants[variant],
        className,
      )}
    >
      {icon && (
        <span className="mt-0.5 shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
      <div>
        <div className="font-medium">{title}</div>
        {children && <div className="mt-1 text-xs">{children}</div>}
      </div>
    </div>
  );
}
