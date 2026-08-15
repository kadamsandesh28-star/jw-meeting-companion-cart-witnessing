import { useEffect, useMemo, useState } from "react";

import { FamilyWorshipSession } from "../models/FamilyWorshipSession";
import { familyWorshipService } from "../services/familyWorshipService";

export function useFamilyWorship() {
  const [sessions, setSessions] =
    useState<FamilyWorshipSession[]>([]);

  useEffect(() => {
    setSessions(
      familyWorshipService.getAll()
    );
  }, []);

  useEffect(() => {
    familyWorshipService.saveAll(
      sessions
    );
  }, [sessions]);

  function saveSession(
    session: FamilyWorshipSession
  ) {
    setSessions((current) => {
      const exists = current.some(
        (item) => item.id === session.id
      );

      if (exists) {
        return current.map((item) =>
          item.id === session.id
            ? {
                ...session,
                updatedAt: Date.now(),
              }
            : item
        );
      }

      return [
        {
          ...session,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        ...current,
      ];
    });
  }

  function removeSession(id: string) {
    setSessions((current) =>
      current.filter(
        (item) => item.id !== id
      )
    );
  }

  const recentSessions = useMemo(
    () =>
      [...sessions]
        .sort(
          (a, b) =>
            b.updatedAt - a.updatedAt
        )
        .slice(0, 5),
    [sessions]
  );

  const lastSession = useMemo(
    () =>
      recentSessions.length > 0
        ? recentSessions[0]
        : null,
    [recentSessions]
  );

  return {
    sessions,
    recentSessions,
    lastSession,

    saveSession,

    removeSession,
  };
}