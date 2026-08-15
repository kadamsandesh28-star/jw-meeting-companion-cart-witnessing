import { BookOpen, RotateCcw } from "lucide-react";

import BookAccordion from "../../components/bible/BookAccordion";
import ReadingProgressCard from "../../components/bible/ReadingProgressCard";
import SectionAccordion from "../../components/bible/SectionAccordion";
import TodayReadingCard from "../../components/bible/TodayReadingCard";

import InfoCard from "../../components/ui/InfoCard";
import PageHeader from "../../components/ui/PageHeader";

import { useBibleReading } from "../../hooks/useBibleReading";
import { readingPlanService } from "../../services/readingPlanService";

export default function BibleReading() {
  const {
    progress,
    reading,
    completedReadingIds,
    completedCount,
    percentComplete,
    totalReadings,
    completedToday,
    completeToday,
    toggleReading,
    updateNotes,
    reset,
  } = useBibleReading();

  const hebrewBooks =
    readingPlanService.getBooksWithReadings("Hebrew Scriptures");

  const greekBooks =
    readingPlanService.getBooksWithReadings("Greek Scriptures");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Bible Reading"
        description="Follow your one-year Bible reading plan and track your spiritual progress."
        icon={<BookOpen size={32} />}
      />

      <ReadingProgressCard
        completedCount={completedCount}
        totalReadings={totalReadings}
        percentComplete={percentComplete}
        streak={progress.streak}
      />

      <TodayReadingCard
        reading={reading}
        completedToday={completedToday}
        onComplete={completeToday}
      />

      <SectionAccordion
        title="Hebrew Scriptures"
        defaultExpanded
      >
        {hebrewBooks.map((book) => (
          <BookAccordion
            key={book.book}
            title={book.book}
            readings={book.readings}
            completedReadings={completedReadingIds}
            onToggleReading={toggleReading}
          />
        ))}
      </SectionAccordion>

      <SectionAccordion title="Greek Scriptures">
        {greekBooks.map((book) => (
          <BookAccordion
            key={book.book}
            title={book.book}
            readings={book.readings}
            completedReadings={completedReadingIds}
            onToggleReading={toggleReading}
          />
        ))}
      </SectionAccordion>

      <InfoCard title="Notes">
        <textarea
          value={progress.notes}
          onChange={(e) => updateNotes(e.target.value)}
          rows={6}
          placeholder="Write your thoughts, insights, or favorite scriptures..."
          className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm outline-none transition focus:border-indigo-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
        />
      </InfoCard>

      <InfoCard title="Reset Progress">
        <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
          Clear your Bible reading progress and start again.
        </p>

        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          <RotateCcw size={18} />
          Reset Progress
        </button>
      </InfoCard>
    </div>
  );
}