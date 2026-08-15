import { CalendarDays, CheckCircle2 } from "lucide-react";
import { meetingData } from "../../data/mock/meetingData";
import { usePlanner } from "../../contexts/PlannerContext";

const MeetingHeader = () => {
  const { planner } = usePlanner();

  const totalSections = planner.length;

  const completedSections = planner.filter(
    (item) => item.status === "Ready"
  ).length;

  const progress =
    totalSections === 0
      ? 0
      : Math.round((completedSections / totalSections) * 100);

  return (
    <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
        <CalendarDays className="h-5 w-5" />
        <span className="text-sm font-semibold uppercase tracking-wide">
          Week of {meetingData.weekOf}
        </span>
      </div>

      <h1 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
        Meetings
      </h1>

      <div className="mt-6 flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
        <div>
          <p>
            <strong>Midweek:</strong>{" "}
            {meetingData.midweek.meetingDate} • {meetingData.midweek.meetingTime}
          </p>

          <p className="mt-1">
            <strong>Weekend:</strong>{" "}
            {meetingData.weekend.meetingDate} • {meetingData.weekend.meetingTime}
          </p>
        </div>

        <div className="flex items-center gap-2 font-medium text-green-600">
          <CheckCircle2 className="h-5 w-5" />
          {completedSections} of {totalSections} prepared
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex justify-between text-sm font-medium">
          <span>Preparation Progress</span>
          <span>{progress}%</span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className="h-full rounded-full bg-green-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default MeetingHeader;