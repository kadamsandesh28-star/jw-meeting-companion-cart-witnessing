import { DashboardData } from "../models/dashboard";

export const dashboardData: DashboardData = {
  greeting: "Good Evening",

  nextMeeting: {
    type: "Midweek Meeting",
    date: "Wednesday • 7:00 PM",
    countdown: "2 days",
  },

  reminders: [
    {
      id: "1",
      title: "Finish Bible Reading",
      completed: true,
    },
    {
      id: "2",
      title: "Prepare Living as Christians",
      completed: false,
    },
    {
      id: "3",
      title: "Review Watchtower",
      completed: false,
    },
  ],

  progress: [
    {
      id: "1",
      title: "Bible Reading",
      completed: true,
    },
    {
      id: "2",
      title: "Midweek Workbook",
      completed: true,
    },
    {
      id: "3",
      title: "Living as Christians",
      completed: true,
    },
    {
      id: "4",
      title: "Watchtower",
      completed: false,
    },
    {
      id: "5",
      title: "Public Talk",
      completed: false,
    },
  ],

  quickActions: [
    {
      id: "1",
      title: "Midweek",
      icon: "📖",
      route: "/midweek",
    },
    {
      id: "2",
      title: "Weekend",
      icon: "📚",
      route: "/weekend",
    },
    {
      id: "3",
      title: "Notes",
      icon: "📝",
      route: "/notes",
    },
    {
      id: "4",
      title: "Timers",
      icon: "⏱",
      route: "/timers",
    },
  ],
};