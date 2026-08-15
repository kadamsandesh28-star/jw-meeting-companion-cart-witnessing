import { NavLink } from "react-router-dom";
import { Lock } from "lucide-react";

import { useWorkspace } from "../../contexts/WorkspaceContext";
import { navigation } from "./Navigation";

interface SidebarProps {
  mobile?: boolean;
}

export default function Sidebar({
  mobile = false,
}: SidebarProps) {
  const { workspace, congregationUnlocked } = useWorkspace();

  const visibleNavigation =
    workspace === "personal"
      ? navigation.filter(
          (group) => group.workspace === "personal"
        )
      : navigation;

  return (
    <aside
      className={`
        ${mobile ? "flex" : "hidden md:flex"}
        w-64 flex-col border-r
        bg-white dark:bg-slate-900
        dark:border-slate-800
      `}
    >
      {/* App Logo */}
      <div className="border-b border-slate-200 p-6 dark:border-slate-800">
        <h1 className="text-xl font-bold">
          JW Meeting Companion
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Version 2
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        {visibleNavigation.map((group) => (
          <div
            key={group.workspace}
            className="mb-8"
          >
            <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              {group.workspace === "congregation" && (
                <Lock size={12} />
              )}

              {group.title}
            </h2>

            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;

                const disabled =
                  group.workspace === "congregation" &&
                  !congregationUnlocked;

                return (
                  <NavLink
                    key={item.path}
                    to={disabled ? "#" : item.path}
                    onClick={(e) => {
                      if (disabled) {
                        e.preventDefault();

                        // Temporary until the unlock dialog is connected
                        alert(
                          "Congregation Workspace is locked."
                        );
                      }
                    }}
                    className={({ isActive }) =>
                      [
                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                        disabled
                          ? "cursor-not-allowed opacity-50"
                          : isActive
                          ? "bg-blue-600 text-white"
                          : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
                      ].join(" ")
                    }
                  >
                    <Icon size={20} />

                    <span>{item.label}</span>

                    {disabled && (
                      <Lock
                        size={14}
                        className="ml-auto"
                      />
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-200 p-4 text-xs text-slate-500 dark:border-slate-800">
        © {new Date().getFullYear()} JW Meeting Companion
      </div>
    </aside>
  );
}