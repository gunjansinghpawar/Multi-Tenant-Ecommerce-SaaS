"use client";

import React from "react";
import { 
  PageHeader, 
  Button,
  DataTable,
  Badge,
} from "@commercex/ui";
import { PlusIcon, FileTextIcon, SettingsIcon, MoreHorizontalIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

type Page = {
  id: string;
  title: string;
  slug: string;
  type: "Static" | "Landing Page" | "System";
  status: "Published" | "Draft" | "Scheduled";
  lastUpdated: string;
  seoScore: number;
};

const data: Page[] = [
  { id: "home", title: "Homepage", slug: "/", type: "System", status: "Published", lastUpdated: "2 hours ago", seoScore: 95 },
  { id: "about", title: "About Us", slug: "/about", type: "Static", status: "Published", lastUpdated: "1 month ago", seoScore: 82 },
  { id: "contact", title: "Contact", slug: "/contact", type: "Static", status: "Published", lastUpdated: "2 months ago", seoScore: 78 },
  { id: "faq", title: "FAQ", slug: "/faq", type: "Static", status: "Draft", lastUpdated: "1 day ago", seoScore: 65 },
  { id: "bf-2026", title: "Black Friday Sale 2026", slug: "/black-friday", type: "Landing Page", status: "Scheduled", lastUpdated: "3 days ago", seoScore: 88 },
  { id: "policies", title: "Privacy Policy", slug: "/privacy", type: "Static", status: "Published", lastUpdated: "1 year ago", seoScore: 90 },
];

const columns: ColumnDef<Page>[] = [
  { 
    accessorKey: "title", 
    header: "Title",
    cell: ({ row }) => (
      <Link href={`/cms/pages/${row.original.id}`} className="flex items-center font-medium text-primary hover:underline">
        <FileTextIcon className="mr-2 h-4 w-4 text-muted-foreground" />
        {row.getValue("title")}
      </Link>
    )
  },
  { 
    accessorKey: "slug", 
    header: "URL Slug",
    cell: ({ row }) => <span className="text-muted-foreground text-sm">{row.getValue("slug")}</span>
  },
  { 
    accessorKey: "type", 
    header: "Type",
    cell: ({ row }) => <Badge variant="outline">{row.getValue("type")}</Badge>
  },
  { 
    accessorKey: "status", 
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variant = status === "Published" ? "success" : status === "Scheduled" ? "warning" : "secondary";
      return <Badge variant={variant as any}>{status}</Badge>;
    }
  },
  { 
    accessorKey: "seoScore", 
    header: "SEO",
    cell: ({ row }) => {
      const score = row.getValue("seoScore") as number;
      const color = score >= 90 ? "text-success" : score >= 70 ? "text-warning" : "text-destructive";
      return <span className={`font-medium ${color}`}>{score}/100</span>;
    }
  },
  { accessorKey: "lastUpdated", header: "Last Updated" },
  {
    id: "actions",
    cell: () => (
      <Button variant="ghost" size="icon">
        <MoreHorizontalIcon className="h-4 w-4" />
      </Button>
    )
  }
];

export default function CMSPagesPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Pages" 
        text="Manage your store's static pages, landing pages, and core system pages."
      >
        <div className="flex gap-2">
          <Button variant="outline">
            <SettingsIcon className="mr-2 h-4 w-4" />
            Global SEO Settings
          </Button>
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            Create Page
          </Button>
        </div>
      </PageHeader>

      <DataTable columns={columns} data={data} searchKey="title" />
    </div>
  );
}
