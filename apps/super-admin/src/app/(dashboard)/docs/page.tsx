import React from "react";
import { PageHeader, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@commercex/ui";
import { BookIcon, FileTextIcon, CodeIcon } from "lucide-react";
import Link from "next/link";

export default function SuperAdminDocsPage() {
  const docs = [
    { title: "Platform Overview", description: "Learn about the architecture and core concepts of the CommerceX platform.", icon: BookIcon, href: "#" },
    { title: "API Reference", description: "Detailed documentation for the REST and GraphQL APIs.", icon: CodeIcon, href: "#" },
    { title: "Deployment Guide", description: "Step-by-step instructions for deploying new tenants and managing environments.", icon: FileTextIcon, href: "#" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Documentation" 
        text="Internal guides and API references for the super admin team."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {docs.map((doc) => (
          <Link href={doc.href} key={doc.title}>
            <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer">
              <CardHeader>
                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                  <doc.icon className="h-6 w-6" />
                </div>
                <CardTitle>{doc.title}</CardTitle>
                <CardDescription>{doc.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
