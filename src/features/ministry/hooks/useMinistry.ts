import { useCallback, useEffect, useState } from "react";

import {
  MinistryFormData,
  MinistrySession,
  MinistryStatistics,
} from "../types/ministry";

import { ministryService } from "../services/ministryService";

export function useMinistry() {
  const [sessions, setSessions] = useState<MinistrySession[]>([]);
  const [statistics, setStatistics] =
    useState<MinistryStatistics>({
      totalHours: 0,
      totalSessions: 0,
      totalReturnVisits: 0,
      totalBibleStudies: 0,
      totalPlacements: 0,
      totalVideosShown: 0,
    });

  const refresh = useCallback(() => {
    setSessions(ministryService.getSessions());
    setStatistics(ministryService.getStatistics());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const getSession = (id: string) => {
    return ministryService.getSession(id);
  };

  const addSession = (data: MinistryFormData) => {
    ministryService.addSession(data);
    refresh();
  };

  const updateSession = (
    id: string,
    data: MinistryFormData
  ) => {
    ministryService.updateSession(id, data);
    refresh();
  };

  const deleteSession = (id: string) => {
    ministryService.deleteSession(id);
    refresh();
  };

  const clearSessions = () => {
    ministryService.clearSessions();
    refresh();
  };

  return {
    sessions,
    statistics,

    refresh,

    getSession,
    addSession,
    updateSession,
    deleteSession,
    clearSessions,
  };
}