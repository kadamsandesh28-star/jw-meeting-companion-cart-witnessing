import {
  BookMarked,
  BookOpen,
  CalendarClock,
  HeartHandshake,
  NotebookPen,
  CheckSquare,
  User,
  Users,
} from "lucide-react";

import ActionCard from "../../components/ui/ActionCard";

export default function Personal() {
  return (
    <div className="space-y-6">
      <header>
        <div className="flex items-center gap-3">
          <User
            className="text-indigo-600"
            size={32}
          />

          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Personal
            </h1>

            <p className="text-slate-600 dark:text-slate-400">
              Build and strengthen your daily spiritual routine.
            </p>
          </div>
        </div>
      </header>

      <div className="space-y-4">
        <ActionCard
          icon={<BookOpen size={22} />}
          title="Bible Reading"
          description="Read and track your daily Bible reading."
          to="/personal/bible-reading"
        />

        <ActionCard
          icon={<BookMarked size={22} />}
          title="Personal Study"
          description="Continue your personal study projects."
          to="/personal/personal-study"
        />

        <ActionCard
          icon={<NotebookPen size={22} />}
          title="Notebook"
          description="Personal notes, talk outlines, assemblies, conventions and more."
          to="/personal/notebooks"
        />

        <ActionCard
          icon={<CalendarClock size={22} />}
          title="Life Schedule"
          description="Plan your daily personal and spiritual routine."
          to="/personal/life-schedule"
        />

        <ActionCard
          icon={<HeartHandshake size={22} />}
          title="Prayer Journal"
          description="Record prayers, blessings, and reflections."
          to="/personal/prayer"
        />

        <ActionCard
          icon={<Users size={22} />}
          title="Family Worship"
          description="Plan meaningful family worship evenings."
          to="/personal/family-worship"
        />

        <ActionCard
          icon={<CheckSquare size={22} />}
          title="Personal Tasks"
          description="Keep track of spiritual and everyday reminders."
          to="/personal/tasks"
        />
      </div>
    </div>
  );
}