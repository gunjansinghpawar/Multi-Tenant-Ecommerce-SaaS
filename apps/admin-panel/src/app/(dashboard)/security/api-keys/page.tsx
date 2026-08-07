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
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@commercex/ui";
import { PlusIcon, KeyIcon, MoreVerticalIcon, CopyIcon } from "lucide-react";

export default function ApiKeysPage() {
  const apiKeys = [
    {
      id: "key_1",
      name: "Production Storefront API",
      prefix: "pk_prod_...",
      lastUsed: "2 minutes ago",
      createdAt: "Jan 12, 2023",
      status: "active",
      type: "Public",
    },
    {
      id: "key_2",
      name: "ERP Integration Sync",
      prefix: "sk_prod_...",
      lastUsed: "1 hour ago",
      createdAt: "Mar 04, 2023",
      status: "active",
      type: "Secret",
    },
    {
      id: "key_3",
      name: "Old Staging App",
      prefix: "sk_test_...",
      lastUsed: "Never",
      createdAt: "Dec 01, 2022",
      status: "revoked",
      type: "Secret",
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="API Keys" 
        text="Manage API keys used to authenticate requests to the CommerceX API."
      >
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create New Key
        </Button>
      </PageHeader>
      
      <Card>
        <CardHeader>
          <CardTitle>Your API Keys</CardTitle>
          <CardDescription>
            Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name / Type</TableHead>
                  <TableHead>Key Prefix</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Last Used</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKeys.map((key) => (
                  <TableRow key={key.id}>
                    <TableCell>
                      <div className="font-medium text-sm flex items-center gap-2">
                        {key.name}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {key.type} Key
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono border">
                          {key.prefix}
                        </code>
                        {key.status === 'active' && (
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <CopyIcon className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{key.createdAt}</TableCell>
                    <TableCell className="text-sm">{key.lastUsed}</TableCell>
                    <TableCell>
                      {key.status === 'active' ? (
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Revoked</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <MoreVerticalIcon className="h-4 w-4" />
                      </Button>
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
