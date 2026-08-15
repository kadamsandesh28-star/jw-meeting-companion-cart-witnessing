import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface SectionAccordionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export default function SectionAccordion({
  title,
  children,
  defaultExpanded = true,
}: SectionAccordionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between p-4"
      >
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          {title}
        </h2>

        {expanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </button>

      {expanded && (
        <div className="space-y-4 border-t border-slate-200 p-4 dark:border-slate-700">
          {children}
        </div>
      )}
    </div>
  );
}