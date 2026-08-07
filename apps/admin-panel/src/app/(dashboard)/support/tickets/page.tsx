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
import { PlusIcon, TicketIcon, MessageSquareIcon } from "lucide-react";
import { EntityRowActions, EntityBulkActions } from "../../../../components/ui/entity-actions";

export default function SupportTicketsPage() {
  const tickets = [
    { id: "T-1092", subject: "Billing Issue - Double Charge", status: "Open", updated: "2 hours ago" },
    { id: "T-1091", subject: "How to configure custom domain?", status: "Pending", updated: "Yesterday" },
    { id: "T-1090", subject: "Bug: Checkout crashing on mobile", status: "Resolved", updated: "3 days ago" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Support Tickets" 
        text="View and manage your support inquiries."
      >
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          New Ticket
        </Button>
      </PageHeader>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Tickets</CardTitle>
          <CardDescription>Track the status of your requests to our support team.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <EntityBulkActions selectedCount={0} />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID / Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell>
                      <div className="font-medium text-sm flex items-center gap-2">
                        <TicketIcon className="h-4 w-4 text-muted-foreground" />
                        {ticket.subject}
                      </div>
                      <div className="text-xs text-muted-foreground font-mono mt-0.5 ml-6">{ticket.id}</div>
                    </TableCell>
                    <TableCell>
                      {ticket.status === 'Open' ? (
                        <Badge className="bg-orange-100 text-orange-800 border-orange-200">Open</Badge>
                      ) : ticket.status === 'Resolved' ? (
                        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Resolved</Badge>
                      ) : (
                        <Badge variant="secondary">Pending</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{ticket.updated}</TableCell>
                    <TableCell className="text-right">
                      <EntityRowActions id={ticket.id} entityName="Ticket" />
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
