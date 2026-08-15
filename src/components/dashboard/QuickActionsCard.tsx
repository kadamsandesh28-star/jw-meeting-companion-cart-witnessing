import {
  BookOpen,
  CalendarDays,
  ClipboardList,
  Mic,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Card from "../ui/Card";

const actions = [
{
  label: "Meetings",
  icon: CalendarDays,
  route: "/meetings",
},
  {
    label: "Workbook",
    icon: BookOpen,
    route: "/workbook",
  },
  {
    label: "Assignments",
    icon: Mic,
    route: "/assignments",
  },
  {
    label: "Service Report",
    icon: ClipboardList,
    route: "/service",
  },
];

export default function QuickActionsCard() {
  const navigate = useNavigate();

  return (
    <Card title="Quick Actions" icon={<Zap size={20} />}>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.label}
              onClick={() => navigate(action.route)}
              className="
                group
                flex flex-col items-center justify-center
                rounded-2xl
                border border-slate-200
                bg-gradient-to-br from-slate-50 to-white
                p-6
                transition-all duration-300
                hover:-translate-y-1
                hover:border-indigo-200
                hover:shadow-lg
                dark:border-slate-700
                dark:from-slate-900
                dark:to-slate-800
              "
            >
              <div
                className="
                  mb-4
                  flex h-14 w-14 items-center justify-center
                  rounded-2xl
                  bg-indigo-100
                  text-indigo-600
                  transition-all duration-300
                  group-hover:scale-110
                  group-hover:bg-indigo-600
                  group-hover:text-white
                  dark:bg-indigo-950
                  dark:text-indigo-300
                "
              >
                <Icon size={28} />
              </div>

              <span className="text-center text-sm font-semibold text-slate-700 dark:text-slate-200">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}