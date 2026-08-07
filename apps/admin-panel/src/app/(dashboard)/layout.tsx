import React from "react";
import { Sidebar } from "../../components/layout/sidebar";
import { Topbar } from "../../components/layout/topbar";
import { SearchDrawer } from "@commercex/ui";
import { GlobalDialogProvider } from "../../components/providers/global-dialog-provider";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <GlobalDialogProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden min-w-0">
          <Topbar />
          <SearchDrawer />
          <main className="flex-1 overflow-y-auto bg-muted/30 p-4 md:p-8">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </GlobalDialogProvider>
  );
}
