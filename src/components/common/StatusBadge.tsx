import { MeetingStatus } from "../../data/mock/meetingData";

interface StatusBadgeProps {
  status: MeetingStatus;
}

const statusConfig = {
  completed: {
    label: "Completed",
    className:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  },
  "in-progress": {
    label: "In Progress",
    className:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  },
  "not-started": {
    label: "Not Started",
    className:
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  },
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
};

export default StatusBadge;