import { WorshipTemplate } from "../models/WorshipTemplate";

export const familyLifeTemplates: WorshipTemplate[] = [
  {
    id: "family-worship",

    name: "Family Worship",

    description:
      "Strengthen your family's regular worship routine.",

    category: "Family Life",

    icon: "👨‍👩‍👧",

    color: "#7b1fa2",

    title: "Making Family Worship Enjoyable",

    theme:
      "Building a consistent and joyful worship routine.",

    bibleReading: "Deuteronomy 6:6-7",

    openingSong: "Song 3",

    closingSong: "Song 135",

    discussionQuestions: [
      "Why is regular family worship important?",
      "How can every family member participate?",
      "What makes worship enjoyable?",
    ],

    defaultGoals: [
      "Hold family worship every week.",
      "Let each family member participate.",
    ],

    suggestedMedia: [],

    favorite: false,
  },

  {
    id: "marriage",

    name: "Marriage",

    description:
      "Strengthen love and respect in marriage.",

    category: "Family Life",

    icon: "💍",

    color: "#ec407a",

    title: "Building a Strong Marriage",

    theme:
      "Showing love and deep respect every day.",

    bibleReading: "Ephesians 5:22-33",

    openingSong: "Song 30",

    closingSong: "Song 136",

    discussionQuestions: [
      "How can husbands imitate Christ?",
      "How can wives show deep respect?",
      "How does good communication help?",
    ],

    defaultGoals: [
      "Express appreciation daily.",
      "Pray together regularly.",
    ],

    suggestedMedia: [],

    favorite: false,
  },

  {
    id: "children",

    name: "Children",

    description:
      "Helping children build a friendship with Jehovah.",

    category: "Family Life",

    icon: "🧒",

    color: "#43a047",

    title: "Helping Children Love Jehovah",

    theme:
      "Teaching children through love and example.",

    bibleReading: "Proverbs 22:6",

    openingSong: "Song 134",

    closingSong: "Song 137",

    discussionQuestions: [
      "How do children learn best?",
      "How can parents set a good example?",
      "How can worship stay enjoyable?",
    ],

    defaultGoals: [
      "Read one Bible account together.",
      "Encourage children to answer.",
    ],

    suggestedMedia: [],

    favorite: false,
  },
];