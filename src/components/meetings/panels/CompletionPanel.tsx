import { MeetingStatus } from "../../../data/mock/meetingData";

interface CompletionPanelProps {
  status: MeetingStatus;
  onStatusChange: (status: MeetingStatus) => void;
}

export default function CompletionPanel({
  status,
  onStatusChange,
}: CompletionPanelProps) {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
          ✅ Mark Complete
        </h4>

        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Track your preparation progress for this meeting section.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Current Status:
          <span className="ml-2 font-semibold capitalize">
            {status.replace("-", " ")}
          </span>
        </p>
      </div>

      <button
        onClick={() => onStatusChange("completed")}
        disabled={status === "completed"}
        className={`rounded-lg px-4 py-2 font-medium transition ${
          status === "completed"
            ? "cursor-not-allowed bg-green-600 text-white opacity-70"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        }`}
      >
        {status === "completed"
          ? "Completed ✓"
          : "Mark as Completed"}
      </button>
    </div>
  );
}