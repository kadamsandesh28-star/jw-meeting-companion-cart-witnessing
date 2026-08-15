import React, { useState } from "react";
import { LucideIcon, BookOpen, FileText } from "lucide-react";
import StatusBadge from "../common/StatusBadge";
import { MeetingStatus } from "../../data/mock/meetingData";
import NotesPanel from "./panels/NotesPanel";
import CompletionPanel from "./panels/CompletionPanel";
import {
  openBible,
  openPublication,
} from "../../utils/jwLibrary";

interface MeetingSectionCardProps {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  scripture?: string;
  publication?: string;
  meetingReference?: string;
  status: MeetingStatus;
  actions: string[];
  onStatusChange: (status: MeetingStatus) => void;
}

const MeetingSectionCard: React.FC<MeetingSectionCardProps> = ({
  id,
  icon: Icon,
  title,
  description,
  scripture,
  publication,
  meetingReference,
  status,
  actions,
  onStatusChange,
}) => {
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const renderPanel = () => {
    switch (activeAction) {
      case "Mark Complete":
        return (
          <CompletionPanel
            status={status}
            onStatusChange={onStatusChange}
          />
        );

      case "Notes":
        return <NotesPanel sectionId={id} />;

      case "Study":
      case "Workbook":
      case "Prepare":
        return (
          <div className="space-y-5">
            <div>
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                📖 Study Material
              </h4>

              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Everything you need for this meeting section.
              </p>
            </div>

            {scripture && (
              <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Bible Reading
                    </p>

                    <p className="mt-1 font-semibold text-blue-600 dark:text-blue-400">
                      {scripture}
                    </p>
                  </div>

                  <button
                    onClick={() => openBible(scripture)}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                  >
                    <BookOpen className="h-4 w-4" />
                    Open Bible
                  </button>
                </div>
              </div>
            )}

            {(publication || meetingReference) && (
              <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Publication
                    </p>

                    <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                      {publication ?? meetingReference}
                    </p>

                    {meetingReference && publication && (
                      <p className="mt-1 text-xs text-slate-500">
                        {meetingReference}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() =>
                      openPublication(publication ?? meetingReference)
                    }
                    className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                  >
                    <FileText className="h-4 w-4" />
                    Open Publication
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-100 p-3 dark:bg-blue-900/30">
            <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              {title}
            </h3>

            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {description}
            </p>

            {scripture && (
              <p className="mt-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                📖 {scripture}
              </p>
            )}

            {publication && (
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                📚 {publication}
              </p>
            )}

            {meetingReference && (
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                📄 {meetingReference}
              </p>
            )}
          </div>
        </div>

        <StatusBadge status={status} />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {actions.map((action) => (
          <button
            key={action}
            onClick={() =>
              setActiveAction((current) =>
                current === action ? null : action
              )
            }
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200 ${
              activeAction === action
                ? "border-indigo-600 bg-indigo-600 text-white shadow-md"
                : "border-slate-300 hover:bg-slate-100 dark:border-slate-600 dark:text-white dark:hover:bg-slate-800"
            }`}
          >
            {action}
          </button>
        ))}
      </div>

      {activeAction && (
        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/50">
          {renderPanel()}
        </div>
      )}
    </div>
  );
};

export default MeetingSectionCard;