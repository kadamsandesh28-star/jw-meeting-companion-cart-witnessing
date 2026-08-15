import { WorshipTemplate } from "../models/WorshipTemplate";

export const bibleBookTemplates: WorshipTemplate[] = [
  {
    id: "genesis",

    name: "Genesis",

    description:
      "Discover Jehovah's purpose from the beginning.",

    category: "Bible Books",

    icon: "📖",

    color: "#43a047",

    title: "Genesis — Trust Jehovah's Purpose",

    theme:
      "Learning from the beginning of God's purpose.",

    bibleReading: "Genesis 1:1-31",

    openingSong: "Song 4",

    closingSong: "Song 150",

    discussionQuestions: [
      "What does creation teach us about Jehovah?",
      "Why was mankind created?",
      "How does Genesis strengthen our faith?"
    ],

    defaultGoals: [
      "Read Genesis chapter 1 together.",
      "Talk about one lesson from creation."
    ],

    suggestedMedia: [],

    favorite: false,
  },

  {
    id: "psalms",

    name: "Psalms",

    description:
      "Strengthen your appreciation through praise.",

    category: "Bible Books",

    icon: "🎵",

    color: "#1976d2",

    title: "Learning From the Psalms",

    theme:
      "Developing gratitude and trust in Jehovah.",

    bibleReading: "Psalm 23",

    openingSong: "Song 25",

    closingSong: "Song 139",

    discussionQuestions: [
      "Why did David love Jehovah?",
      "Which verse encourages you most?",
      "How can we praise Jehovah daily?"
    ],

    defaultGoals: [
      "Memorize one favorite verse.",
      "Thank Jehovah every day this week."
    ],

    suggestedMedia: [],

    favorite: false,
  },

  {
    id: "proverbs",

    name: "Proverbs",

    description:
      "Gain practical wisdom for everyday life.",

    category: "Bible Books",

    icon: "💡",

    color: "#fb8c00",

    title: "Applying Proverbs Every Day",

    theme:
      "Using Bible wisdom in family decisions.",

    bibleReading: "Proverbs 3:1-12",

    openingSong: "Song 35",

    closingSong: "Song 134",

    discussionQuestions: [
      "Why is Jehovah's wisdom better than human wisdom?",
      "How can Proverbs help young ones?",
      "What verse should our family remember?"
    ],

    defaultGoals: [
      "Read one proverb every day.",
      "Apply one piece of Bible wisdom this week."
    ],

    suggestedMedia: [],

    favorite: false,
  },
];