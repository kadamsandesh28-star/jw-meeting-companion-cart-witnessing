import { Menu } from "lucide-react";

import WorkspaceSwitcher from "./WorkspaceSwitcher";

interface Props {
  onMenuClick: () => void;
}

export default function Header({
  onMenuClick,
}: Props) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-xl font-bold">
            JW Meeting Companion
          </h1>

          <p className="text-xs text-slate-500">
            Version 2
          </p>
        </div>
      </div>

      <WorkspaceSwitcher />
    </header>
  );
}