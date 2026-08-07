"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button } from "@commercex/ui";
import { UploadCloudIcon, CheckCircleIcon, FileIcon } from "lucide-react";

export function ImportWizard({ isOpen, onClose, entityName }: { isOpen: boolean, onClose: () => void, entityName: string }) {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
      <Card className="w-full max-w-2xl animate-in zoom-in-95 duration-200">
        <CardHeader className="border-b bg-slate-50/50">
          <CardTitle>Import {entityName}</CardTitle>
          <CardDescription>Step {step} of 3: {step === 1 ? 'Upload CSV' : step === 2 ? 'Map Columns' : 'Confirm Import'}</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {step === 1 && (
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => setFile(new File([], "data.csv"))}>
              <UploadCloudIcon className="mx-auto h-12 w-12 text-slate-400 mb-4" />
              <h3 className="text-lg font-medium">Click to upload or drag and drop</h3>
              <p className="text-sm text-muted-foreground mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
              {file && <div className="mt-4 flex justify-center"><Badge variant="secondary"><FileIcon className="mr-2 h-3 w-3" /> data.csv</Badge></div>}
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-sm">Map the columns from your CSV to the correct fields in the database.</p>
              <div className="grid grid-cols-2 gap-4 border-t pt-4">
                <div className="font-medium text-sm">CSV Column</div>
                <div className="font-medium text-sm">Database Field</div>
                <div className="text-sm p-2 bg-slate-100 rounded">Product Title</div>
                <select className="border rounded p-2 text-sm"><option>name</option></select>
                <div className="text-sm p-2 bg-slate-100 rounded">Base Price</div>
                <select className="border rounded p-2 text-sm"><option>price</option></select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-8">
              <CheckCircleIcon className="mx-auto h-16 w-16 text-emerald-500 mb-4" />
              <h3 className="text-xl font-bold">Ready to Import!</h3>
              <p className="text-muted-foreground mt-2">1,240 records are ready to be imported into {entityName}.</p>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-4 border-t">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <div className="space-x-2">
              {step > 1 && <Button variant="outline" onClick={() => setStep(step - 1)}>Back</Button>}
              {step < 3 ? (
                <Button onClick={() => setStep(step + 1)}>Next Step</Button>
              ) : (
                <Button onClick={onClose} className="bg-emerald-600 hover:bg-emerald-700">Start Import</Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Simple Badge mock since it's not exported at top level in this file
function Badge({ children, variant, className }: any) {
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>{children}</span>;
}
