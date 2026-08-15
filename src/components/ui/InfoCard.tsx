import { ReactNode } from "react";

interface InfoCardProps {
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function InfoCard({
  title,
  children,
  footer,
}: InfoCardProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      {title && (
        <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
          {title}
        </h2>
      )}

      <div>{children}</div>

      {footer && (
        <div className="mt-6 border-t border-slate-200 pt-4 dark:border-slate-700">
          {footer}
        </div>
      )}
    </section>
  );
}