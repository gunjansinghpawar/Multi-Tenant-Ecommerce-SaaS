"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Form, RHFInput, Button, Avatar, AvatarImage, AvatarFallback, useToast } from "@commercex/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2Icon } from "lucide-react";

const profileSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

type ProfileValues = z.infer<typeof profileSchema>;

export function ProfileForm({ user }: { user: any }) {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  
  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.name || "",
      email: user?.email || "",
    },
  });

  const onSubmit = async (data: ProfileValues) => {
    setSaving(true);
    // Simulate an API call to save profile
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({ 
      title: "Profile Updated", 
      description: "Your personal details have been saved successfully." 
    });
    setSaving(false);
  };

  const initials = user?.initials || "SA";
  const avatarUrl = user?.avatarUrl || "";

  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your profile picture and details.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-6 mb-8 p-4 bg-muted/20 rounded-xl border">
          <Avatar className="h-20 w-20 border-2 border-background shadow-sm">
            <AvatarImage src={avatarUrl} alt="Admin" />
            <AvatarFallback className="text-xl bg-primary/10 text-primary font-semibold">{initials}</AvatarFallback>
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
                inputProps={{ type: "email", disabled: true }}
              />
            </div>

            <div className="flex justify-end pt-4 border-t">
              <Button type="submit" disabled={saving}>
                {saving ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : null}
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
