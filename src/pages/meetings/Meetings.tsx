import {
  CalendarDays,
  BarChart3,
  BookOpen,
  Mic,
} from "lucide-react";

import ActionCard from "../../components/ui/ActionCard";

export default function Meetings() {
  return (
    <div className="space-y-6">
      <header>
        <div className="flex items-center gap-3">
          <CalendarDays
            className="text-indigo-600"
            size={32}
          />

          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Meetings
            </h1>

            <p className="text-slate-600 dark:text-slate-400">
              Prepare for your congregation meetings.
            </p>
          </div>
        </div>
      </header>

      <div className="space-y-4">
        <ActionCard
          icon={<BarChart3 size={22} />}
          title="Meeting Progress"
          description="View your overall meeting preparation and see what needs your attention next."
          to="/meetings/progress"
        />

        <ActionCard
          icon={<BookOpen size={22} />}
          title="Midweek Meeting"
          description="Workbook, notes, assignments, and Chairman Assistant."
          to="/meetings/midweek"
        />

        <ActionCard
          icon={<Mic size={22} />}
          title="Weekend Meeting"
          description="Public Talk, Watchtower Study, notes, and Chairman Assistant."
          to="/meetings/weekend"
        />
      </div>
    </div>
  );
}