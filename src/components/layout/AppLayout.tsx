import AppHeader from "./AppHeader";
import BottomNav from "./BottomNav";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <AppHeader />

      <main className="pb-24">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
}