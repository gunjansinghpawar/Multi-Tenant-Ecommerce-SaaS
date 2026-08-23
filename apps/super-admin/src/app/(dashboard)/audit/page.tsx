import React from "react";
import { PageHeader } from "@commercex/ui";
import { prisma } from "@commercex/database";
import { AuditLogsClient, AuditLogUI } from "./audit-client";

export default async function AuditLogsPage() {
  // Fetch real audit logs from the database
  const logs = await prisma.auditLog.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    take: 100 // Limit to latest 100 for performance
  });

  // Map database logs to UI type
  const formattedLogs: AuditLogUI[] = logs.map((log: any) => {
    // Determine status based on action name
    const isFailed = log.action.includes("FAILED") || log.action.includes("ERROR");
    
    return {
      id: log.id,
      action: log.action,
      user: log.actorEmail || log.actorId,
      target: log.resourceType + (log.resourceId ? ` (${log.resourceId})` : ""),
      date: new Date(log.createdAt).toLocaleString(),
      ip: log.ipAddress || "Unknown",
      status: isFailed ? "Failed" : "Success",
    };
  });

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Audit Logs" 
        text="View platform-wide security and activity logs."
      />

      <AuditLogsClient data={formattedLogs} />
    </div>
  );
}
