"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  SearchIcon,
  MenuIcon,
  PlusIcon,
  MessageSquareIcon,
  BuildingIcon,
  CheckIcon,
  ChevronsUpDownIcon
} from "lucide-react";
import {
  Input,
  Button,
  Avatar,
  AvatarImage,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  ThemeToggle,
  Breadcrumbs,
  useSidebar,
  NotificationDrawer,
  ProfileMenu,
  useToast
} from "@commercex/ui";
import { cn } from "@commercex/utils";

import { logoutAction } from "../../actions/auth.actions";

// Dummy data for Tenant Switcher
const tenants = [
  { id: "1", name: "Acme Corp", plan: "Enterprise" },
  { id: "2", name: "Globex Inc", plan: "Pro" },
];

// const currentUser = { 
//   name: "Super Admin", 
//   email: "admin@commercex.com", 
//   initials: "SA", 
//   avatarUrl: "https://github.com/shadcn.png" 
// };

const dummyNotifications = [
  { id: "1", title: "New Tenant", description: "Acme Corp just joined.", time: "5 mins ago", read: false },
];

export function Topbar({ user }: { user?: any }) {
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [activeTenant, setActiveTenant] = React.useState(tenants[0]);

  const handleLogout = async () => {
    await logoutAction();
    toast({
      title: "Logged Out",
      description: "You have been securely logged out.",
    });
    router.replace("/login");
  };

  // Generate basic breadcrumbs from pathname
  const paths = pathname.split("/").filter(Boolean);
  const breadcrumbItems = [
    { label: "Overview", href: "/" },
    ...paths.map((p, i) => ({
      label: p.charAt(0).toUpperCase() + p.slice(1),
      href: "/" + paths.slice(0, i + 1).join("/"),
    }))
  ];

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-background/80 px-4 md:px-6 backdrop-blur-md">

      {/* Left Section: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-4 flex-1">
        <Button variant="ghost" size="icon" className="md:hidden shrink-0" onClick={toggleSidebar}>
          <MenuIcon className="h-5 w-5" />
        </Button>
        <div className="hidden md:flex">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

      {/* Center Section: Search */}
      <div className="hidden md:flex flex-1 justify-center max-w-md w-full px-4">
        <div className="relative w-full">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search resources... (Ctrl+K)"
            className="w-full bg-muted/50 pl-9 rounded-[10px] focus-visible:bg-background"
          />
        </div>
      </div>

      {/* Right Section: Actions & Profile */}
      <div className="flex items-center gap-2 md:gap-3 flex-1 justify-end">

        {/* Quick Create */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="hidden sm:flex h-9 gap-1 rounded-[10px]">
              <PlusIcon className="h-4 w-4" />
              <span>Create</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Create Tenant</DropdownMenuItem>
            <DropdownMenuItem>Create Admin User</DropdownMenuItem>
            <DropdownMenuItem>Generate Invoice</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="h-4 w-px bg-border hidden sm:block mx-1" />

        {/* Messages */}
        <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-[10px]">
          <MessageSquareIcon className="h-4 w-4 text-muted-foreground" />
        </Button>

        {/* Notifications */}
        <NotificationDrawer notifications={dummyNotifications} />

        <ThemeToggle />

        <div className="h-4 w-px bg-border hidden sm:block mx-1" />

        {/* Profile Dropdown */}
        {user && (
          <ProfileMenu
            user={user}
            onLogout={handleLogout}
            onProfileClick={() => router.push('/profile')}
            onSettingsClick={() => router.push('/settings')}
            onShortcutsClick={() => router.push('/shortcuts')}
            onSupportClick={() => router.push('/support')}
          />
        )}

      </div>
    </header>
  );
}

