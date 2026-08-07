"use client";

import React, { useState } from "react";
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
  RHFSelect
} from "@commercex/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MailIcon, SendIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  role: z.string(),
  department: z.string(),
});

export default function InviteStaffPage() {
  const router = useRouter();
  const [isSending, setIsSending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      role: "Support Agent",
      department: "Customer Success",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      alert(`Invitation sent to ${values.email}`);
      router.push("/staff/list");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Invite New Staff" 
        text="Send an email invitation to add a new member to your workspace."
      />
      
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MailIcon className="mr-2 h-5 w-5" />
            Invitation Details
          </CardTitle>
          <CardDescription>The user will receive a link to set their password and log in.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <RHFInput name="firstName" label="First Name" inputProps={{ placeholder: "Jane" }} />
                <RHFInput name="lastName" label="Last Name" inputProps={{ placeholder: "Doe" }} />
              </div>
              
              <RHFInput name="email" label="Email Address" inputProps={{ placeholder: "jane.doe@example.com" }} />

              <div className="grid grid-cols-2 gap-4">
                <RHFSelect 
                  name="role" 
                  label="Assign Role" 
                  options={[
                    { label: "Super Admin", value: "Super Admin" },
                    { label: "Store Manager", value: "Store Manager" },
                    { label: "Marketing Lead", value: "Marketing Lead" },
                    { label: "Support Agent", value: "Support Agent" },
                  ]} 
                />
                <RHFSelect 
                  name="department" 
                  label="Department" 
                  options={[
                    { label: "Management", value: "Management" },
                    { label: "Operations", value: "Operations" },
                    { label: "Marketing", value: "Marketing" },
                    { label: "Customer Success", value: "Customer Success" },
                  ]} 
                />
              </div>
              
              <div className="pt-4 flex justify-end space-x-2">
                <Button variant="outline" type="button" onClick={() => router.push("/staff/list")}>Cancel</Button>
                <Button type="submit" disabled={isSending}>
                  <SendIcon className={`mr-2 h-4 w-4 ${isSending ? 'animate-pulse' : ''}`} />
                  {isSending ? "Sending Invite..." : "Send Invitation"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
