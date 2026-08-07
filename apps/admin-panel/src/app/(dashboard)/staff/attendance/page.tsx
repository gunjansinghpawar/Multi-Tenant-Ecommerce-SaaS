"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  Button
} from "@commercex/ui";
import { CalendarClockIcon, RocketIcon } from "lucide-react";

export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Attendance & Leave Management" 
        text="Track staff clock-ins, sick leave, and vacation days."
      />
      
      <Card className="border-dashed border-2 bg-muted/10">
        <CardContent className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <CalendarClockIcon className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Coming Soon</h3>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              We are building a comprehensive HR suite including biometric integrations, shift scheduling, and payroll exports.
            </p>
          </div>
          <Button className="mt-4"><RocketIcon className="mr-2 h-4 w-4" /> Notify Me When Released</Button>
        </CardContent>
      </Card>
    </div>
  );
}
