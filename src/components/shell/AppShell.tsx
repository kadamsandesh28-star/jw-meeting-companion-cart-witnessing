import { Outlet } from "react-router-dom";
import { useState } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";
import MobileDrawer from "./MobileDrawer";

export default function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Drawer */}
      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          onMenuClick={() => setMobileOpen(true)}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}