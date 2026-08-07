"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  SettingsIcon,
  PaletteIcon,
  GlobeIcon,
  ShieldIcon,
  LinkIcon,
  BellIcon,
  AlertTriangleIcon
} from "lucide-react";

const sidebarNavItems = [
  {
    title: "General",
    href: "/settings",
    icon: SettingsIcon
  },
  {
    title: "Branding",
    href: "/settings/branding",
    icon: PaletteIcon
  },
  {
    title: "Localization",
    href: "/settings/localization",
    icon: GlobeIcon
  },
  {
    title: "Security",
    href: "/settings/security",
    icon: ShieldIcon
  },
  {
    title: "Domains",
    href: "/settings/domains",
    icon: LinkIcon
  },
  {
    title: "Notifications",
    href: "/settings/notifications",
    icon: BellIcon
  },
  {
    title: "Advanced",
    href: "/settings/advanced",
    icon: AlertTriangleIcon
  }
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="space-y-0.5">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your store configuration and preferences.
        </p>
      </div>
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 border-t border-border pt-8">
        <aside className="-mx-4 lg:w-1/5 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 px-4 lg:px-0 min-w-max lg:min-w-0">
            {sidebarNavItems.map((item) => {
              // Exact match for /settings, otherwise startsWith
              const isActive = item.href === "/settings" 
                ? pathname === item.href 
                : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors
                    ${isActive 
                      ? "bg-primary/10 text-primary hover:bg-primary/20" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }
                  `}
                >
                  <item.icon className={`h-4 w-4 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </aside>
        <div className="flex-1 max-w-4xl">{children}</div>
      </div>
    </div>
  );
}
