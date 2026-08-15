import { WorshipTemplate } from "../models/WorshipTemplate";

export const christianLivingTemplates: WorshipTemplate[] = [
  {
    id: "prayer",

    name: "Prayer",

    description:
      "Strengthen your family's prayers.",

    category: "Christian Living",

    icon: "🙏",

    color: "#388e3c",

    title: "The Power of Prayer",

    theme:
      "Drawing closer to Jehovah through prayer.",

    bibleReading: "Matthew 6:9-13",

    openingSong: "Song 22",

    closingSong: "Song 151",

    discussionQuestions: [
      "Why does Jehovah invite us to pray?",
      "What can make our prayers more meaningful?",
      "How did Jesus set an example in prayer?",
    ],

    defaultGoals: [
      "Pray together every day.",
      "Include personal expressions in prayer.",
    ],

    suggestedMedia: [],

    favorite: false,
  },

  {
    id: "faith",

    name: "Faith",

    description:
      "Build stronger faith in Jehovah's promises.",

    category: "Christian Living",

    icon: "💙",

    color: "#1976d2",

    title: "Growing Strong Faith",

    theme:
      "Learning to trust Jehovah completely.",

    bibleReading: "Hebrews 11:1-6",

    openingSong: "Song 28",

    closingSong: "Song 150",

    discussionQuestions: [
      "What is faith?",
      "How does faith affect our decisions?",
      "Which Bible examples strengthen our faith?",
    ],

    defaultGoals: [
      "Read one faith-building account this week.",
      "Pray specifically about increasing faith.",
    ],

    suggestedMedia: [],

    favorite: false,
  },

  {
    id: "love",

    name: "Love",

    description:
      "Develop genuine Christian love.",

    category: "Christian Living",

    icon: "❤️",

    color: "#d32f2f",

    title: "Showing Genuine Love",

    theme:
      "Reflecting Jehovah's love in our family.",

    bibleReading: "1 Corinthians 13",

    openingSong: "Song 105",

    closingSong: "Song 127",

    discussionQuestions: [
      "Why is love the greatest quality?",
      "How can we show love at home?",
      "How did Jesus demonstrate love?",
    ],

    defaultGoals: [
      "Perform one act of kindness every day.",
      "Express appreciation to a family member.",
    ],

    suggestedMedia: [],

    favorite: false,
  }
];