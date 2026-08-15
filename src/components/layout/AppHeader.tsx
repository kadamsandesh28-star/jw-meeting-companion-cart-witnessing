import { Bell, Menu, Moon, User } from "lucide-react";

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <button className="rounded-xl p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800">
            <Menu
              size={20}
              className="text-white"
            />
          </button>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">
              JW Meeting Companion
            </h1>

            <p className="text-xs text-white">
              Stay prepared
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="rounded-xl p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800">
            <Bell
              size={18}
              className="text-white"
            />
          </button>

          <button className="rounded-xl p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800">
            <Moon
              size={18}
              className="text-white"
            />
          </button>

          <button className="rounded-xl p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800">
            <User
              size={18}
              className="text-white"
            />
          </button>
        </div>
      </div>
    </header>
  );
}