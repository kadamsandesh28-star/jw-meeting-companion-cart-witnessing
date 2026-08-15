interface MeetingTabsProps {
  activeTab: "midweek" | "weekend";
  onTabChange: (tab: "midweek" | "weekend") => void;
}

export default function MeetingTabs({
  activeTab,
  onTabChange,
}: MeetingTabsProps) {
  return (
    <div className="mb-8">
      <div className="inline-flex rounded-2xl bg-slate-100 p-1 dark:bg-slate-800">
        <button
          onClick={() => onTabChange("midweek")}
          className={`rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 ${
            activeTab === "midweek"
              ? "bg-white text-indigo-600 shadow dark:bg-slate-900 dark:text-indigo-400"
              : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          }`}
        >
          📖 Midweek Meeting
        </button>

        <button
          onClick={() => onTabChange("weekend")}
          className={`rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 ${
            activeTab === "weekend"
              ? "bg-white text-indigo-600 shadow dark:bg-slate-900 dark:text-indigo-400"
              : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          }`}
        >
          📚 Weekend Meeting
        </button>
      </div>
    </div>
  );
}