import {
  Home,
  User,
  Landmark,
  Briefcase,
  Settings as SettingsIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const items = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/personal", icon: User, label: "Personal" },
  { to: "/meetings", icon: Landmark, label: "Meetings" },
  { to: "/ministry", icon: Briefcase, label: "Ministry" },
  { to: "/settings", icon: SettingsIcon, label: "Settings" },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-white/90 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/90">
      <div className="grid grid-cols-5">
        {items.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-3 text-xs transition-colors ${
                isActive
                  ? "text-indigo-600"
                  : "text-slate-500 hover:text-indigo-500 dark:text-slate-400"
              }`
            }
          >
            <Icon className="mb-1 h-5 w-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}