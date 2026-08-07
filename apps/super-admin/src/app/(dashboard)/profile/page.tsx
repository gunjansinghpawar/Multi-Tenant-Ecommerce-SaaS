"use client";

import React from "react";
import { PageHeader, Card, CardContent, CardHeader, CardTitle, CardDescription, Form, RHFInput, Button, Avatar, AvatarImage, AvatarFallback } from "@commercex/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const profileSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

type ProfileValues = z.infer<typeof profileSchema>;

export default function SuperAdminProfilePage() {
  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "Super Admin",
      email: "admin@commercex.com",
    },
  });

  const onSubmit = (data: ProfileValues) => {
    console.log("Saving profile:", data);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Profile" 
        text="Manage your personal super admin account settings."
      />

      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your profile picture and details.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-6 mb-8">
            <Avatar className="h-20 w-20">
              <AvatarImage src="" alt="Admin" />
              <AvatarFallback className="text-xl">SA</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Button variant="outline" size="sm">Change Picture</Button>
              <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size of 800K</p>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <RHFInput
                  name="fullName"
                  label="Full Name"
                />
                <RHFInput
                  name="email"
                  label="Email Address"
                  inputProps={{ type: "email" }}
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit">
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
