export interface Reminder {
  id: string;
  title: string;
  completed: boolean;
}

export interface ProgressItem {
  id: string;
  title: string;
  completed: boolean;
}

export interface QuickAction {
  id: string;
  title: string;
  icon: string;
  route: string;
}

export interface DashboardData {
  greeting: string;

  nextMeeting: {
    type: string;
    date: string;
    countdown: string;
  };

  reminders: Reminder[];

  progress: ProgressItem[];

  quickActions: QuickAction[];
}