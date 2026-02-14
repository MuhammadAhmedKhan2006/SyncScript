import { Outlet } from "react-router-dom";
import AppSidebar from "@/components/AppSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row graph-paper">
      <AppSidebar />
      <main className="flex-1 min-w-0 p-4 sm:p-6 pt-20 sm:pt-6 overflow-y-auto">
        <Outlet />
      </main>
      <ThemeToggle />
    </div>
  );
}
