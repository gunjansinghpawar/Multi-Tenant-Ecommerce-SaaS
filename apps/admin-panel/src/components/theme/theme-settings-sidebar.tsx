"use client";

import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@commercex/ui";
import { Label, Input, Switch, Button } from "@commercex/ui";
import { Paintbrush, Layout, Type, Palette, Move, MousePointer2, CreditCard, FormInput, FileCode2, LayoutTemplate } from "lucide-react";

export function ThemeSettingsSidebar() {
  return (
    <div className="w-80 border-r bg-card h-full flex flex-col shrink-0">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Paintbrush className="w-5 h-5 text-primary" />
          Theme Settings
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Customize the look and feel of your theme.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Accordion type="multiple" className="w-full">
          
          {/* Design Tokens */}
          <AccordionItem value="typography" className="border-b-0 border-t">
            <AccordionTrigger className="px-4 hover:bg-muted/50"><span className="flex items-center gap-2"><Type className="w-4 h-4" /> Typography</span></AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2 space-y-4">
              <div className="space-y-2">
                <Label>Primary Font</Label>
                <Input defaultValue="Inter" />
              </div>
              <div className="space-y-2">
                <Label>Heading Font</Label>
                <Input defaultValue="Cal Sans" />
              </div>
              <div className="space-y-2">
                <Label>Base Size</Label>
                <Input defaultValue="16px" />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="colors">
            <AccordionTrigger className="px-4 hover:bg-muted/50"><span className="flex items-center gap-2"><Palette className="w-4 h-4" /> Color System</span></AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2 space-y-4">
               <div className="flex items-center justify-between">
                 <Label>Primary Color</Label>
                 <div className="w-6 h-6 rounded-md bg-blue-600 border cursor-pointer" />
               </div>
               <div className="flex items-center justify-between">
                 <Label>Background</Label>
                 <div className="w-6 h-6 rounded-md bg-white border cursor-pointer" />
               </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="spacing">
            <AccordionTrigger className="px-4 hover:bg-muted/50"><span className="flex items-center gap-2"><Move className="w-4 h-4" /> Spacing</span></AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2 space-y-4">
              <div className="space-y-2">
                <Label>Container Padding</Label>
                <Input defaultValue="2rem" />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Components */}
          <AccordionItem value="buttons">
            <AccordionTrigger className="px-4 hover:bg-muted/50"><span className="flex items-center gap-2"><MousePointer2 className="w-4 h-4" /> Buttons</span></AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2 space-y-4">
              <div className="space-y-2">
                <Label>Border Radius</Label>
                <Input defaultValue="8px" />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="cards">
            <AccordionTrigger className="px-4 hover:bg-muted/50"><span className="flex items-center gap-2"><CreditCard className="w-4 h-4" /> Cards</span></AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2 space-y-4">
               <div className="flex items-center justify-between">
                <Label>Shadow</Label>
                <Switch defaultChecked />
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="forms">
            <AccordionTrigger className="px-4 hover:bg-muted/50"><span className="flex items-center gap-2"><FormInput className="w-4 h-4" /> Forms</span></AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2 space-y-4">
              <div className="space-y-2">
                <Label>Input Style</Label>
                <Input defaultValue="Outlined" />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Layout */}
          <AccordionItem value="layout">
            <AccordionTrigger className="px-4 hover:bg-muted/50"><span className="flex items-center gap-2"><LayoutTemplate className="w-4 h-4" /> Layout</span></AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2 space-y-4">
               <div className="space-y-2">
                <Label>Container Width</Label>
                <Input defaultValue="1200px" />
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="header">
            <AccordionTrigger className="px-4 hover:bg-muted/50"><span className="flex items-center gap-2"><Layout className="w-4 h-4" /> Header & Footer</span></AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2 space-y-4">
               <div className="flex items-center justify-between">
                <Label>Sticky Header</Label>
                <Switch defaultChecked />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Advanced */}
          <AccordionItem value="advanced" className="border-b-0">
            <AccordionTrigger className="px-4 hover:bg-muted/50"><span className="flex items-center gap-2"><FileCode2 className="w-4 h-4" /> Advanced</span></AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2 space-y-4">
               <Button variant="outline" className="w-full">Edit Global CSS</Button>
               <Button variant="outline" className="w-full">Edit Custom JS</Button>
               <Button variant="outline" className="w-full">Theme Variables</Button>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>
    </div>
  );
}
