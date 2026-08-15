import { ReactNode } from "react";
import clsx from "clsx";

interface CardProps {
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export default function Card({
  title,
  icon,
  children,
  footer,
  className,
}: CardProps) {
  return (
    <div
      className={clsx(
        // Card
        "group relative overflow-hidden",

        // Shape
        "rounded-3xl",

        // Background
        "bg-white/95 dark:bg-slate-900",

        // Border
        "border border-slate-200/80 dark:border-slate-700",

        // Shadow
        "shadow-sm",

        // Motion
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1",
        "hover:shadow-xl",

        // Padding
        "p-6",

        className
      )}
    >
      {/* Soft gradient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 opacity-70" />

      {(title || icon) && (
        <div className="mb-5 flex items-center gap-3">
          {icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
              {icon}
            </div>
          )}

          {title && (
            <h2 className="text-lg font-semibold tracking-tight text-slate-800 dark:text-slate-100">
              {title}
            </h2>
          )}
        </div>
      )}

      <div className="text-slate-700 dark:text-slate-300">
        {children}
      </div>

      {footer && (
        <div className="mt-6 border-t border-slate-200 pt-4 dark:border-slate-700">
          {footer}
        </div>
      )}
    </div>
  );
}