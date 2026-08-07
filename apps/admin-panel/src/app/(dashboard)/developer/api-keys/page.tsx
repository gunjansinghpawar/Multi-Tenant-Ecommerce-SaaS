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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Badge,
} from "@commercex/ui";
import { KeyIcon, PlusIcon, TrashIcon, CopyIcon } from "lucide-react";

export default function ApiKeysPage() {
  const keys = [
    { id: "key_prod_894", name: "Mobile App Production", prefix: "pk_prod_...", created: "Oct 24, 2026", lastUsed: "2 mins ago", status: "Active" },
    { id: "key_test_102", name: "Staging Environment", prefix: "sk_test_...", created: "Sep 12, 2026", lastUsed: "5 days ago", status: "Active" },
    { id: "key_prod_001", name: "Old Integration", prefix: "sk_prod_...", created: "Jan 1, 2025", lastUsed: "Never", status: "Revoked" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="API Keys" 
        text="Manage authentications for your custom integrations."
      >
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Generate New Key
        </Button>
      </PageHeader>
      
      <Card>
        <CardHeader>
          <CardTitle>Active API Keys</CardTitle>
          <CardDescription>Keep your secret keys secure. Do not expose them in public repositories.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Key Name</TableHead>
                  <TableHead>Token Prefix</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Used</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keys.map((k) => (
                  <TableRow key={k.id}>
                    <TableCell>
                      <div className="font-medium text-sm flex items-center gap-2">
                        <KeyIcon className="h-4 w-4 text-muted-foreground" />
                        {k.name}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">{k.prefix}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{k.created}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{k.lastUsed}</TableCell>
                    <TableCell>
                      {k.status === 'Active' ? (
                        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Active</Badge>
                      ) : (
                        <Badge variant="secondary">Revoked</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon" disabled={k.status === 'Revoked'}>
                        <CopyIcon className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10" disabled={k.status === 'Revoked'}>
                        <TrashIcon className="h-4 w-4" />
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
