"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent,
  Button,
} from "@commercex/ui";
import { UploadIcon, FileTextIcon, MoreVerticalIcon } from "lucide-react";

export default function MediaDocumentsPage() {
  const documents = Array.from({ length: 6 }).map((_, i) => ({
    id: `doc_${i}`,
    name: `User-Manual-v${i + 1}.pdf`,
    size: "1.2 MB",
    type: "PDF Document",
  }));

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Documents" 
        text="Manage your PDFs, spec sheets, and downloadable manuals."
      >
        <Button>
          <UploadIcon className="mr-2 h-4 w-4" />
          Upload Documents
        </Button>
      </PageHeader>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {documents.map((doc) => (
          <Card key={doc.id} className="overflow-hidden hover:border-primary/50 transition-colors group cursor-pointer">
            <div className="aspect-[3/4] bg-muted/30 border-b flex flex-col items-center justify-center relative p-4">
              <FileTextIcon className="h-16 w-16 text-muted-foreground/50 mb-2" />
              <div className="text-[10px] font-mono bg-red-100 text-red-800 px-1.5 py-0.5 rounded">PDF</div>
              
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="secondary" size="icon" className="h-7 w-7 rounded-full shadow-sm">
                  <MoreVerticalIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-3">
              <p className="text-sm font-medium truncate" title={doc.name}>{doc.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{doc.size}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
