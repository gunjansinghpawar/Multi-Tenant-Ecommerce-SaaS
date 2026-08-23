"use client";

import * as React from "react";
import { UserIcon, SettingsIcon, KeyboardIcon, LifeBuoyIcon, LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
  initials?: string;
}

export interface ProfileMenuProps {
  user: UserProfile;
  onLogout?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onShortcutsClick?: () => void;
  onSupportClick?: () => void;
  children?: React.ReactNode;
}

export function ProfileMenu({
  user,
  onLogout,
  onProfileClick,
  onSettingsClick,
  onShortcutsClick,
  onSupportClick,
  children,
}: ProfileMenuProps) {
  const defaultInitials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const initials = user.initials || defaultInitials;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0 overflow-hidden border border-border">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {children ? (
          children
        ) : (
          <>
            <DropdownMenuItem onClick={onProfileClick} className="cursor-pointer">
              <UserIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onSettingsClick} className="cursor-pointer">
              <SettingsIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onShortcutsClick} className="cursor-pointer">
              <KeyboardIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Keyboard Shortcuts</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onLogout}
          className="text-destructive focus:text-destructive cursor-pointer"
        >
          <LogOutIcon className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
