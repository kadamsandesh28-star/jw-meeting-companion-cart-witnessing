import { useEffect, useState } from "react";

import { Study, StudyType } from "../models/Study";
import { studyService } from "../services/studyService";

export function useStudies() {
  const [studies, setStudies] = useState<Study[]>([]);

  useEffect(() => {
    setStudies(studyService.getAll());
  }, []);

  const createStudy = (
    title: string,
    type: StudyType,
    description = ""
  ): Study => {
    const study = studyService.createAndReturn(
      title,
      type,
      description
    );

    setStudies(studyService.getAll());

    return study;
  };

  const updateStudy = (study: Study) => {
    setStudies(
      studyService.update(study)
    );
  };

  const deleteStudy = (id: string) => {
    setStudies(
      studyService.delete(id)
    );
  };

  const toggleFavorite = (id: string) => {
    setStudies(
      studyService.toggleFavorite(id)
    );
  };

  const archiveStudy = (id: string) => {
    setStudies(
      studyService.archive(id)
    );
  };

  return {
    studies,
    createStudy,
    updateStudy,
    deleteStudy,
    toggleFavorite,
    archiveStudy,
  };
}