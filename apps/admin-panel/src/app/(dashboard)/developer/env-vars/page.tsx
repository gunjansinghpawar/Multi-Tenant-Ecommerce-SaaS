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
} from "@commercex/ui";
import { LockIcon, PlusIcon, TrashIcon, EyeOffIcon } from "lucide-react";

export default function EnvVarsPage() {
  const vars = [
    { id: "env_1", key: "NEXT_PUBLIC_STRIPE_KEY", value: "pk_test_************************" },
    { id: "env_2", key: "SENDGRID_API_KEY", value: "SG.********************************" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Environment Variables" 
        text="Store secrets securely for use in serverless functions and integrations."
      >
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Variable
        </Button>
      </PageHeader>
      
      <Card>
        <CardHeader>
          <CardTitle>Secure Secrets</CardTitle>
          <CardDescription>Values are encrypted at rest. Variables starting with NEXT_PUBLIC_ are exposed to the browser.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Key</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vars.map((v) => (
                  <TableRow key={v.id}>
                    <TableCell>
                      <div className="font-medium font-mono text-sm flex items-center gap-2">
                        <LockIcon className="h-4 w-4 text-muted-foreground" />
                        {v.key}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        {v.value}
                        <EyeOffIcon className="h-3 w-3" />
                      </div>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
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
