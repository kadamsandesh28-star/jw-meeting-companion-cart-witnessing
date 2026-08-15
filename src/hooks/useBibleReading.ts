import { useCallback, useEffect, useMemo, useState } from "react";

import { bibleReadingService } from "../services/bibleReadingService";
import { readingPlanService } from "../services/readingPlanService";

import type { BibleReadingProgress } from "../types/bible";

export function useBibleReading() {
  const [progress, setProgress] = useState<BibleReadingProgress>(
    bibleReadingService.getProgress()
  );

  const [reading, setReading] = useState(
    bibleReadingService.getCurrentReading()
  );

  const refresh = useCallback(() => {
    setProgress(bibleReadingService.getProgress());
    setReading(bibleReadingService.getCurrentReading());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const completeToday = () => {
    bibleReadingService.markTodayComplete();
    refresh();
  };

  const toggleReading = (id: number) => {
    bibleReadingService.toggleReading(id);
    refresh();
  };

  const updateNotes = (notes: string) => {
    bibleReadingService.updateNotes(notes);
    refresh();
  };

  const reset = () => {
    bibleReadingService.resetProgress();
    refresh();
  };

  const totalReadings =
    readingPlanService.getTotalReadings();

  const completedReadingIds = useMemo(
    () => bibleReadingService.getCompletedReadingIds(),
    [progress]
  );

  const completedCount = completedReadingIds.length;

  const percentComplete = useMemo(() => {
    if (totalReadings === 0) {
      return 0;
    }

    return Math.round(
      (completedCount / totalReadings) * 100
    );
  }, [completedCount, totalReadings]);

  return {
    progress,
    reading,

    completedReadingIds,
    completedCount,

    percentComplete,
    totalReadings,

    completedToday: bibleReadingService.completedToday(),

    completeToday,
    toggleReading,

    updateNotes,
    reset,
  };
}