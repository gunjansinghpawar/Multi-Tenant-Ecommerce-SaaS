"use client";

import React, { useState } from "react";
import { 
  PageHeader,
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  Button,
  Badge,
  Input, Textarea, Label
} from "@commercex/ui";
import { Paintbrush, Check, Send } from "lucide-react";

export default function ThemeSelectionPage() {
  const [themes, setThemes] = useState([
    {
      id: "lumina-pro",
      name: "Lumina Pro",
      version: "2.4.1",
      developer: "CommerceX",
      isActive: true,
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "minimalist",
      name: "Minimalist",
      version: "1.0.5",
      developer: "Studio Designs",
      isActive: false,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "bold-store",
      name: "Bold Store",
      version: "3.2.0",
      developer: "CommerceX",
      isActive: false,
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800&auto=format&fit=crop",
    }
  ]);

  const handleActivate = (id: string) => {
    setThemes(themes.map(t => ({ ...t, isActive: t.id === id })));
  };

  return (
    <div className="space-y-8">
      <PageHeader
        heading="Themes"
        text="Manage your website's look and feel by selecting a theme, or request a personalized one."
      />

      <div>
        <h3 className="text-xl font-semibold mb-4">Available Themes</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {themes.map((theme) => (
            <Card key={theme.id} className={`overflow-hidden transition-all hover:shadow-md ${theme.isActive ? 'ring-2 ring-primary' : ''}`}>
              <div className="relative aspect-video w-full overflow-hidden bg-muted">
                <img 
                  src={theme.image} 
                  alt={theme.name} 
                  className="object-cover w-full h-full transition-transform hover:scale-105"
                />
                {theme.isActive && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="default" className="bg-primary text-primary-foreground flex items-center gap-1">
                      <Check className="h-3 w-3" /> Active
                    </Badge>
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-lg">
                  {theme.name}
                </CardTitle>
                <CardDescription>
                  By {theme.developer} • v{theme.version}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                {theme.isActive ? (
                  <Button className="w-full" variant="outline" disabled>
                    Currently Active
                  </Button>
                ) : (
                  <Button className="w-full" onClick={() => handleActivate(theme.id)}>
                    Activate
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-12 border-t pt-8">
        <div className="max-w-2xl">
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <Paintbrush className="h-5 w-5 text-primary" />
            Want a Personalized Theme?
          </h3>
          <p className="text-muted-foreground mb-6">
            If you need custom changes to an existing theme or want a completely personalized theme built from scratch, our design team is here to help. Fill out the form below and we'll get in touch!
          </p>
          
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="requirements">Tell us what you need</Label>
                <Textarea 
                  id="requirements" 
                  placeholder="I love the Minimalist theme, but I need a custom product gallery and a different color scheme..." 
                  rows={4}
                />
              </div>
              <Button className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Submit Request
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
