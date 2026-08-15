export interface PersonalStudy {
  currentBook: string;
  currentChapter: number;
  readingNotes: string;
}

const STORAGE_KEY = "jw-personal-study";

export function loadPersonalStudy(): PersonalStudy {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return {
      currentBook: "Genesis",
      currentChapter: 1,
      readingNotes: "",
    };
  }

  return JSON.parse(saved);
}

export function savePersonalStudy(
  study: PersonalStudy
) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(study)
  );
}