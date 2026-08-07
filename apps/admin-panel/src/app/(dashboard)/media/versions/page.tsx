"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@commercex/ui";
import { HistoryIcon, RotateCcwIcon } from "lucide-react";

export default function MediaVersionsPage() {
  const history = [
    { id: "v_1092", asset: "home-hero-banner.jpg", action: "Replaced file", user: "Admin User", time: "2 hours ago" },
    { id: "v_1091", asset: "logo-dark.svg", action: "Restored previous version", user: "Sarah Smith", time: "Yesterday" },
    { id: "v_1090", asset: "summer-promo.mp4", action: "Deleted", user: "Admin User", time: "3 days ago" },
    { id: "v_1089", asset: "product-1042.jpg", action: "Optimized (Auto)", user: "System", time: "4 days ago" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Version History" 
        text="Audit log of replacements, deletions, and restorations of media files."
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Asset Audit Log</CardTitle>
          <CardDescription>Track changes to critical storefront files.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset Name</TableHead>
                  <TableHead>Action Taken</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead className="text-right">Revert</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <div className="font-medium text-sm flex items-center gap-2">
                        <HistoryIcon className="h-4 w-4 text-muted-foreground" />
                        {log.asset}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{log.action}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{log.user}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{log.time}</TableCell>
                    <TableCell className="text-right">
                      {log.action.includes("Replaced") || log.action.includes("Deleted") ? (
                        <Button variant="ghost" size="sm" className="h-8">
                          <RotateCcwIcon className="h-3 w-3 mr-1" /> Restore
                        </Button>
                      ) : (
                        <span className="text-muted-foreground text-xs">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
