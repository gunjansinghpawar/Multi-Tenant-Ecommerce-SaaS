"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent, Button } from "@commercex/ui";
import { ImageIcon, FolderIcon, SearchIcon, UploadIcon } from "lucide-react";

export function MediaPicker({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
      <Card className="w-full max-w-4xl h-[80vh] flex flex-col animate-in zoom-in-95 duration-200">
        <CardHeader className="border-b bg-slate-50/50 flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg">Media Library Picker</CardTitle>
          <div className="flex gap-2">
            <div className="relative">
              <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <input type="text" placeholder="Search media..." className="pl-8 pr-4 py-2 border rounded-md text-sm" />
            </div>
            <Button><UploadIcon className="mr-2 h-4 w-4" /> Upload</Button>
            <Button variant="ghost" size="icon" onClick={onClose}>&times;</Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-1 flex overflow-hidden">
          <div className="w-48 bg-slate-50 border-r p-4 space-y-2 overflow-y-auto hidden md:block">
            <div className="text-xs font-semibold text-muted-foreground uppercase mb-2">Folders</div>
            <button className="flex items-center text-sm w-full p-2 hover:bg-slate-200 rounded-md font-medium"><FolderIcon className="mr-2 h-4 w-4 text-indigo-500" /> Product Images</button>
            <button className="flex items-center text-sm w-full p-2 hover:bg-slate-200 rounded-md"><FolderIcon className="mr-2 h-4 w-4 text-slate-400" /> Banners</button>
            <button className="flex items-center text-sm w-full p-2 hover:bg-slate-200 rounded-md"><FolderIcon className="mr-2 h-4 w-4 text-slate-400" /> Logos</button>
          </div>
          <div className="flex-1 p-6 overflow-y-auto bg-slate-100/50">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[1,2,3,4,5,6,7,8].map(i => (
                <div key={i} className="group relative aspect-square bg-white border rounded-lg overflow-hidden hover:border-primary cursor-pointer transition-all">
                  <div className="absolute inset-0 bg-slate-100 flex flex-col items-center justify-center text-slate-400">
                    <ImageIcon className="h-8 w-8 mb-2" />
                    <span className="text-xs">img_{i}.png</span>
                  </div>
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="sm">Select</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
