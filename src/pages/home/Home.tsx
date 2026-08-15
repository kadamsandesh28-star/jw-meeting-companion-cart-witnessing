import DashboardHero from "../../components/dashboard/DashboardHero";
import WeeklyProgressCard from "../../components/dashboard/WeeklyProgressCard";
import QuickActionsCard from "../../components/dashboard/QuickActionsCard";
import SimpleRemindersCard from "../../components/dashboard/SimpleRemindersCard";
import MeetingPreparationCard from "../../components/dashboard/MeetingPreparationCard";

import TodoCard from "../../features/dashboard/components/TodoCard";
import CalendarCard from "../../features/dashboard/components/CalendarCard";
import QuickNotesCard from "../../features/dashboard/components/QuickNotesCard";

import { getGreeting } from "../../utils/greeting";

import { usePlanner } from "../../contexts/PlannerContext";

export default function Home() {
  const { planner } = usePlanner();

  const midweek = planner.filter(
    (item) => item.meeting === "Midweek"
  );

  const weekend = planner.filter(
    (item) => item.meeting === "Weekend"
  );

  const liveProgress = [
    {
      title: "Midweek Meeting",
      completed:
        midweek.length > 0 &&
        midweek.every(
          (item) => item.status === "Ready"
        ),
    },
    {
      title: "Weekend Meeting",
      completed:
        weekend.length > 0 &&
        weekend.every(
          (item) => item.status === "Ready"
        ),
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">

      <DashboardHero
        greeting={getGreeting()}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <TodoCard />
        <CalendarCard />
      </div>

     <QuickNotesCard />

<MeetingPreparationCard />

<SimpleRemindersCard />

<WeeklyProgressCard
  progress={liveProgress}
/>

<QuickActionsCard />

    </div>
  );
}