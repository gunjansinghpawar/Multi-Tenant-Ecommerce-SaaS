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
  Form,
  RHFInput,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Badge,
} from "@commercex/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { GlobeIcon, ShieldIcon, TrashIcon } from "lucide-react";

const formSchema = z.object({
  ipAddress: z.string().min(1, "IP address or CIDR is required"),
  description: z.string().optional(),
});

export default function IPRestrictionsPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ipAddress: "",
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Adding IP restriction:", values);
  };

  const restrictedIps = [
    { id: "1", ip: "192.168.10.0/24", description: "Corporate Office VPN", status: "allowed", addedOn: "Jan 15, 2023" },
    { id: "2", ip: "45.22.19.120", description: "Known malicious actor", status: "blocked", addedOn: "Oct 20, 2023" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="IP Restrictions" 
        text="Control which IP addresses can access your CommerceX admin panel."
      />
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Add Rule</CardTitle>
              <CardDescription>Add an IP address or CIDR range.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <RHFInput name="ipAddress" label="IP Address / CIDR" placeholder="e.g., 192.168.1.1/32" />
                  <RHFInput name="description" label="Description" placeholder="e.g., Office Network" />
                  <div className="flex gap-2 pt-2">
                    <Button type="button" variant="outline" className="w-full">Block</Button>
                    <Button type="submit" className="w-full">Allow</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Active Rules</CardTitle>
              <CardDescription>Manage your current IP access control list.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>IP / Range</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Rule</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {restrictedIps.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-mono text-sm">{item.ip}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{item.description}</TableCell>
                        <TableCell>
                          {item.status === "allowed" ? (
                            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                              <ShieldIcon className="mr-1 h-3 w-3" /> Allowed
                            </Badge>
                          ) : (
                            <Badge variant="destructive">
                              <GlobeIcon className="mr-1 h-3 w-3" /> Blocked
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
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
      </div>
    </div>
  );
}
