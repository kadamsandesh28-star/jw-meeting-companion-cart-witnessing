import { BibleStudy } from "../types/bibleStudy";

interface BibleStudyCardProps {
  study: BibleStudy;
  onEdit: (study: BibleStudy) => void;
  onDelete: (study: BibleStudy) => void;
}

export default function BibleStudyCard({
  study,
  onEdit,
  onDelete,
}: BibleStudyCardProps) {
  function getStatusColor() {
    switch (study.status) {
      case "Active":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";

      case "Inactive":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";

      case "Completed":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";

      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  }

  return (
    <div className="rounded-2xl border bg-white p-5 shadow transition hover:shadow-lg dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold dark:text-white">
            {study.studentName}
          </h3>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {study.address}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor()}`}
        >
          {study.status}
        </span>
      </div>

      <div className="mt-5 space-y-2 text-sm dark:text-gray-300">
        <p>
          <strong>Publication:</strong> {study.publication}
        </p>

        <p>
          <strong>Lesson:</strong> {study.currentLesson}
        </p>

        <p>
          <strong>Next Study:</strong> {study.nextStudyDate}
        </p>

        {study.contactNumber && (
          <p>
            <strong>Phone:</strong> {study.contactNumber}
          </p>
        )}

        {study.email && (
          <p>
            <strong>Email:</strong> {study.email}
          </p>
        )}

        {study.notes && (
          <div>
            <strong>Notes:</strong>
            <p className="mt-1 whitespace-pre-wrap rounded-lg bg-gray-50 p-2 dark:bg-slate-800">
              {study.notes}
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={() => onEdit(study)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(study)}
          className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}