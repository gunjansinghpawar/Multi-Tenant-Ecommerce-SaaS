"use client";

import React from "react";
import { 
  PageHeader, 
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge
} from "@commercex/ui";
import { 
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon
} from "lucide-react";

export default function MarketingCalendarPage() {
  // Generate a mock calendar grid for November 2026
  const daysInMonth = 30;
  const startDayOfWeek = 0; // Nov 1 2026 is a Sunday (0)
  
  const calendarCells = [];
  for (let i = 0; i < startDayOfWeek; i++) {
    calendarCells.push(<div key={`empty-${i}`} className="min-h-[120px] p-2 border border-r-0 border-b-0 bg-muted/10 opacity-50"></div>);
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = i === 15; // Mock today
    calendarCells.push(
      <div key={i} className={`min-h-[120px] p-2 border border-r-0 border-b-0 ${isToday ? 'bg-primary/5' : ''}`}>
        <div className="flex justify-between items-start mb-2">
          <span className={`text-sm font-medium w-6 h-6 flex items-center justify-center rounded-full ${isToday ? 'bg-primary text-primary-foreground' : ''}`}>
            {i}
          </span>
        </div>
        
        {/* Mock events */}
        <div className="space-y-1">
          {i === 3 && <Badge variant="secondary" className="w-full text-[10px] justify-start truncate bg-blue-100 text-blue-800 hover:bg-blue-200">Email: Winter Launch</Badge>}
          {i === 26 && <Badge variant="secondary" className="w-full text-[10px] justify-start truncate bg-red-100 text-red-800 hover:bg-red-200">Promo: Thanksgiving</Badge>}
          {i === 27 && (
            <>
              <Badge variant="secondary" className="w-full text-[10px] justify-start truncate bg-black text-white hover:bg-black/80">Sale: Black Friday</Badge>
              <Badge variant="secondary" className="w-full text-[10px] justify-start truncate bg-purple-100 text-purple-800 hover:bg-purple-200">SMS: BF VIP Alert</Badge>
            </>
          )}
          {i === 30 && <Badge variant="secondary" className="w-full text-[10px] justify-start truncate bg-cyan-100 text-cyan-800 hover:bg-cyan-200">Sale: Cyber Monday</Badge>}
        </div>
      </div>
    );
  }

  // Fill out the last row
  const remainingCells = 35 - calendarCells.length; // 5 rows of 7 = 35 (or 42)
  for (let i = 0; i < remainingCells; i++) {
    calendarCells.push(<div key={`end-${i}`} className="min-h-[120px] p-2 border border-r-0 border-b-0 bg-muted/10 opacity-50"></div>);
  }

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Marketing Calendar" 
          text="Plan and visualize your upcoming campaigns and promotions."
        />
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Schedule Event
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold flex items-center">
              <CalendarIcon className="mr-2 h-5 w-5 text-muted-foreground" />
              November 2026
            </h2>
            <div className="flex items-center">
              <Button variant="ghost" size="icon"><ChevronLeftIcon className="h-4 w-4"/></Button>
              <Button variant="ghost" size="sm">Today</Button>
              <Button variant="ghost" size="icon"><ChevronRightIcon className="h-4 w-4"/></Button>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">Emails</Badge>
            <Badge variant="outline" className="bg-purple-50 text-purple-800 border-purple-200">SMS / Push</Badge>
            <Badge variant="outline" className="bg-red-50 text-red-800 border-red-200">Promotions</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-7 border-b border-r bg-muted/50">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-3 text-center text-sm font-medium text-muted-foreground border-l">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 border-r border-b">
            {calendarCells}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
