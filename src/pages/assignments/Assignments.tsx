import { useEffect, useMemo, useState } from "react";
import Card from "../../components/ui/Card";
import Stopwatch from "../../components/chairman/Stopwatch";
import {
  type PlannerAssignment,
  type PlannerStatus,
} from "../../services/plannerService";
import { usePlanner } from "../../contexts/PlannerContext";

const NOTES_KEY =
  "jwMeetingCompanion.assignmentNotes";

export default function Assignments() {
  const { planner } = usePlanner();

  const [notes, setNotes] = useState<
    Record<string, string>
  >({});

  const [activeAssignmentId, setActiveAssignmentId] =
    useState<string | null>(null);

  const activeAssignment = useMemo(
    () =>
      planner.find(
        (assignment) =>
          assignment.id === activeAssignmentId
      ) ?? null,
    [planner, activeAssignmentId]
  );

  useEffect(() => {
    try {
      const saved =
        localStorage.getItem(NOTES_KEY);

      if (saved) {
        setNotes(JSON.parse(saved));
      }
    } catch {
      setNotes({});
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      NOTES_KEY,
      JSON.stringify(notes)
    );
  }, [notes]);

  const midweek = planner.filter(
    (item) => item.meeting === "Midweek"
  );

  const weekend = planner.filter(
    (item) => item.meeting === "Weekend"
  );

  function updateNote(
    id: string,
    value: string
  ) {
    setNotes((previous) => ({
      ...previous,
      [id]: value,
    }));
  }

  function practiceAssignment(id: string) {
    setActiveAssignmentId(id);
  }

  function prepareAssignment(id: string) {
    window.location.assign(
      `/assignments/prepare?assignment=${encodeURIComponent(
        id
      )}`
    );
  }

  function getStatusBadgeColor(
    status: PlannerStatus
  ) {
    switch (status) {
      case "Ready":
        return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300";

      case "In Progress":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300";

      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  }

  function renderSection(
    title: string,
    assignments: PlannerAssignment[]
  ) {
    return (
      <Card>
        <div className="mb-5">
          <h2 className="text-xl font-semibold">
            {title}
          </h2>
        </div>

        {assignments.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No assignments available.
          </p>
        ) : (
          <div className="space-y-5">
            {assignments.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-gray-200 p-4 dark:border-gray-700"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold">
                    {item.title}
                  </h3>

                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusBadgeColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>

                  {item.status === "Ready" && (
                    <span className="rounded-full bg-green-600 px-2 py-1 text-xs font-semibold text-white">
                      ✓ Ready to Present
                    </span>
                  )}
                </div>

                <p className="mt-1 text-sm text-gray-500">
                  {item.meeting}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      practiceAssignment(
                        item.id
                      )
                    }
                    className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Practice This Assignment
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      prepareAssignment(
                        item.id
                      )
                    }
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
                  >
                    Prepare Assignment
                  </button>
                </div>

                <div className="mt-5">
                  <label className="mb-2 block text-sm font-medium">
                    Preparation Notes
                  </label>

                  <textarea
                    value={
                      notes[item.id] ?? ""
                    }
                    onChange={(e) =>
                      updateNote(
                        item.id,
                        e.target.value
                      )
                    }
                    placeholder="Write preparation notes, scriptures, illustrations, timing reminders..."
                    className="min-h-[160px] w-full rounded-lg border border-gray-300 p-3 dark:border-gray-600 dark:bg-gray-800"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Weekly Assignments
        </h1>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Track your assignments, update
          their progress, and keep
          preparation notes for each one.
        </p>
      </div>

      {renderSection(
        "Midweek Meeting",
        midweek
      )}

      {activeAssignment && (
        <Card>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">
                {activeAssignment.title}
              </h2>

              <p className="text-gray-500 dark:text-gray-400">
                {activeAssignment.meeting}
              </p>
            </div>

            <Stopwatch title="Assignment Practice Timer" />
          </div>
        </Card>
      )}

      {renderSection(
        "Weekend Meeting",
        weekend
      )}
    </div>
  );
}