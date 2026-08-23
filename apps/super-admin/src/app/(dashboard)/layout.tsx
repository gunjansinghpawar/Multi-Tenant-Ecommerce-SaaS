import React from "react";
import { Sidebar } from "../../components/layout/sidebar";
import { Topbar } from "../../components/layout/topbar";
import { SearchDrawer } from "@commercex/ui";
import { getCurrentUserAction } from "../../actions/auth.actions";

import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const userRes = await getCurrentUserAction();
  
  if (!userRes.success || !userRes.data) {
    redirect('/login');
  }

  const user = userRes.data;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <Topbar user={user} />
        <SearchDrawer />
        <main className="flex-1 overflow-y-auto bg-muted/30 p-4 md:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
