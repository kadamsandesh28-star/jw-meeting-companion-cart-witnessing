import { ScriptureSection } from "../types/bible";

export interface BibleBook {
  name: string;
  section: ScriptureSection;
  chapters: number;
}

export const bibleBooks: BibleBook[] = [
  // ==========================
  // Hebrew Scriptures
  // ==========================
  { name: "Genesis", section: "Hebrew Scriptures", chapters: 50 },
  { name: "Exodus", section: "Hebrew Scriptures", chapters: 40 },
  { name: "Leviticus", section: "Hebrew Scriptures", chapters: 27 },
  { name: "Numbers", section: "Hebrew Scriptures", chapters: 36 },
  { name: "Deuteronomy", section: "Hebrew Scriptures", chapters: 34 },
  { name: "Joshua", section: "Hebrew Scriptures", chapters: 24 },
  { name: "Judges", section: "Hebrew Scriptures", chapters: 21 },
  { name: "Ruth", section: "Hebrew Scriptures", chapters: 4 },
  { name: "1 Samuel", section: "Hebrew Scriptures", chapters: 31 },
  { name: "2 Samuel", section: "Hebrew Scriptures", chapters: 24 },
  { name: "1 Kings", section: "Hebrew Scriptures", chapters: 22 },
  { name: "2 Kings", section: "Hebrew Scriptures", chapters: 25 },
  { name: "1 Chronicles", section: "Hebrew Scriptures", chapters: 29 },
  { name: "2 Chronicles", section: "Hebrew Scriptures", chapters: 36 },
  { name: "Ezra", section: "Hebrew Scriptures", chapters: 10 },
  { name: "Nehemiah", section: "Hebrew Scriptures", chapters: 13 },
  { name: "Esther", section: "Hebrew Scriptures", chapters: 10 },
  { name: "Job", section: "Hebrew Scriptures", chapters: 42 },
  { name: "Psalms", section: "Hebrew Scriptures", chapters: 150 },
  { name: "Proverbs", section: "Hebrew Scriptures", chapters: 31 },
  { name: "Ecclesiastes", section: "Hebrew Scriptures", chapters: 12 },
  { name: "Song of Solomon", section: "Hebrew Scriptures", chapters: 8 },
  { name: "Isaiah", section: "Hebrew Scriptures", chapters: 66 },
  { name: "Jeremiah", section: "Hebrew Scriptures", chapters: 52 },
  { name: "Lamentations", section: "Hebrew Scriptures", chapters: 5 },
  { name: "Ezekiel", section: "Hebrew Scriptures", chapters: 48 },
  { name: "Daniel", section: "Hebrew Scriptures", chapters: 12 },
  { name: "Hosea", section: "Hebrew Scriptures", chapters: 14 },
  { name: "Joel", section: "Hebrew Scriptures", chapters: 3 },
  { name: "Amos", section: "Hebrew Scriptures", chapters: 9 },
  { name: "Obadiah", section: "Hebrew Scriptures", chapters: 1 },
  { name: "Jonah", section: "Hebrew Scriptures", chapters: 4 },
  { name: "Micah", section: "Hebrew Scriptures", chapters: 7 },
  { name: "Nahum", section: "Hebrew Scriptures", chapters: 3 },
  { name: "Habakkuk", section: "Hebrew Scriptures", chapters: 3 },
  { name: "Zephaniah", section: "Hebrew Scriptures", chapters: 3 },
  { name: "Haggai", section: "Hebrew Scriptures", chapters: 2 },
  { name: "Zechariah", section: "Hebrew Scriptures", chapters: 14 },
  { name: "Malachi", section: "Hebrew Scriptures", chapters: 4 },

  // ==========================
  // Greek Scriptures
  // ==========================
  { name: "Matthew", section: "Greek Scriptures", chapters: 28 },
  { name: "Mark", section: "Greek Scriptures", chapters: 16 },
  { name: "Luke", section: "Greek Scriptures", chapters: 24 },
  { name: "John", section: "Greek Scriptures", chapters: 21 },
  { name: "Acts", section: "Greek Scriptures", chapters: 28 },
  { name: "Romans", section: "Greek Scriptures", chapters: 16 },
  { name: "1 Corinthians", section: "Greek Scriptures", chapters: 16 },
  { name: "2 Corinthians", section: "Greek Scriptures", chapters: 13 },
  { name: "Galatians", section: "Greek Scriptures", chapters: 6 },
  { name: "Ephesians", section: "Greek Scriptures", chapters: 6 },
  { name: "Philippians", section: "Greek Scriptures", chapters: 4 },
  { name: "Colossians", section: "Greek Scriptures", chapters: 4 },
  { name: "1 Thessalonians", section: "Greek Scriptures", chapters: 5 },
  { name: "2 Thessalonians", section: "Greek Scriptures", chapters: 3 },
  { name: "1 Timothy", section: "Greek Scriptures", chapters: 6 },
  { name: "2 Timothy", section: "Greek Scriptures", chapters: 4 },
  { name: "Titus", section: "Greek Scriptures", chapters: 3 },
  { name: "Philemon", section: "Greek Scriptures", chapters: 1 },
  { name: "Hebrews", section: "Greek Scriptures", chapters: 13 },
  { name: "James", section: "Greek Scriptures", chapters: 5 },
  { name: "1 Peter", section: "Greek Scriptures", chapters: 5 },
  { name: "2 Peter", section: "Greek Scriptures", chapters: 3 },
  { name: "1 John", section: "Greek Scriptures", chapters: 5 },
  { name: "2 John", section: "Greek Scriptures", chapters: 1 },
  { name: "3 John", section: "Greek Scriptures", chapters: 1 },
  { name: "Jude", section: "Greek Scriptures", chapters: 1 },
  { name: "Revelation", section: "Greek Scriptures", chapters: 22 },
];