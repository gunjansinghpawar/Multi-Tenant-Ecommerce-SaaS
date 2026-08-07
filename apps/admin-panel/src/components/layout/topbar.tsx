"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { 
  SearchIcon, 
  MenuIcon, 
  PlusIcon,
  MessageSquareIcon,
  StoreIcon,
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
  ProfileMenu
} from "@commercex/ui";
import { cn } from "@commercex/utils";

// Dummy data for Tenant/Store Switcher
const stores = [
  { id: "1", name: "Fashion Boutique", role: "Owner" },
  { id: "2", name: "Tech Gadgets", role: "Manager" },
];

const currentUser = { 
  name: "Admin User", 
  email: "admin@commercex.com", 
  initials: "AD", 
  avatarUrl: "https://github.com/shadcn.png" 
};

const dummyNotifications = [
  { id: "1", title: "New Order", description: "Order #1234 was placed successfully.", time: "10 mins ago", read: false },
  { id: "2", title: "System Update", description: "CommerceX platform will undergo maintenance at 2 AM EST.", time: "1 hr ago", read: true },
];

export function Topbar() {
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const [activeStore, setActiveStore] = React.useState(stores[0]);

  // Generate basic breadcrumbs from pathname
  const paths = pathname.split("/").filter(Boolean);
  const breadcrumbItems = [
    { label: "Dashboard", href: "/" },
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
        <div className="relative hidden md:block w-64 lg:w-80">
          <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search"
            placeholder="Search orders, products... (Ctrl+K)"
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
            <DropdownMenuItem>Create Product</DropdownMenuItem>
            <DropdownMenuItem>Create Order</DropdownMenuItem>
            <DropdownMenuItem>Add Customer</DropdownMenuItem>
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

        {/* Store Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="hidden lg:flex h-9 gap-2 px-2 rounded-[10px] bg-background">
              <div className="flex h-5 w-5 items-center justify-center rounded bg-primary/10 text-primary">
                <StoreIcon className="h-3 w-3" />
              </div>
              <span className="text-sm font-medium truncate max-w-[100px]">{activeStore.name}</span>
              <ChevronsUpDownIcon className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuLabel>Switch Store</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {stores.map(store => (
              <DropdownMenuItem 
                key={store.id} 
                className="justify-between cursor-pointer"
                onClick={() => setActiveStore(store)}
              >
                <div className="flex flex-col">
                  <span>{store.name}</span>
                  <span className="text-xs text-muted-foreground">{store.role}</span>
                </div>
                {activeStore.id === store.id && <CheckIcon className="h-4 w-4 text-primary" />}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <PlusIcon className="mr-2 h-4 w-4" />
              Create Store
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile Dropdown */}
        <ProfileMenu user={currentUser} />

      </div>
    </header>
  );
}
