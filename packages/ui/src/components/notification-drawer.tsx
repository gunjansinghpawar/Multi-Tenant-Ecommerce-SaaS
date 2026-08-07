"use client";

import * as React from "react";
import { BellIcon, CheckIcon } from "lucide-react";
import { Button } from "./button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import { cn } from "@commercex/utils";

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

export interface NotificationDrawerProps {
  notifications?: NotificationItem[];
  onMarkAllAsRead?: () => void;
  onNotificationClick?: (id: string) => void;
}

export function NotificationDrawer({
  notifications = [],
  onMarkAllAsRead,
  onNotificationClick,
}: NotificationDrawerProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-[10px]">
          <BellIcon className="h-4 w-4 text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary border-2 border-background" />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-sm md:w-[400px]">
        <SheetHeader className="mb-4 flex flex-row items-center justify-between space-y-0">
          <div className="flex flex-col space-y-1 text-left">
            <SheetTitle>Notifications</SheetTitle>
            <SheetDescription>
              You have {unreadCount} unread message{unreadCount !== 1 ? "s" : ""}.
            </SheetDescription>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={onMarkAllAsRead} className="h-8 rounded-[10px] text-xs">
              <CheckIcon className="mr-2 h-3 w-3" />
              Mark all read
            </Button>
          )}
        </SheetHeader>
        <div className="flex flex-col space-y-4 overflow-y-auto max-h-[calc(100vh-120px)] pr-2 -mr-2">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <BellIcon className="h-12 w-12 text-muted-foreground/20 mb-4" />
              <p className="text-sm font-medium">No notifications yet</p>
              <p className="text-xs text-muted-foreground">We'll let you know when something happens.</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => onNotificationClick?.(notification.id)}
                className={cn(
                  "flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-muted/50 cursor-pointer border border-transparent",
                  !notification.read && "bg-muted/30 border-border/50"
                )}
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className={cn("text-sm font-medium leading-none", !notification.read && "text-foreground")}>
                      {notification.title}
                    </p>
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {notification.description}
                  </p>
                </div>
                {!notification.read && (
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
                )}
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
