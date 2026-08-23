"use client";

import React, { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter,
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  useToast
} from "@commercex/ui";
import { IMasterEntity } from "@commercex/types/src/masters.types";

import { SearchableReferenceSelect } from "./SearchableReferenceSelect";

interface MasterFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  initialData?: IMasterEntity | null;
  fields?: { 
    name: string; 
    label: string; 
    type?: string;
    virtual?: boolean;
    filterBy?: string;
    referenceModel?: string;
    options?: { label: string; value: string }[];
  }[];
  onSave: (data: Partial<IMasterEntity>) => Promise<void>;
}

export function MasterFormDialog({ open, onOpenChange, title, initialData, fields = [], onSave }: MasterFormDialogProps) {
  const [formData, setFormData] = useState<Partial<IMasterEntity>>({});
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      if (initialData) {
        setFormData(initialData);
      } else {
        setFormData({});
      }
    }
  }, [open, initialData]);

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setIsPending(true);
      
      // Remove virtual fields from payload
      const payload = { ...formData };
      fields.forEach(f => {
        if (f.virtual) {
          delete payload[f.name as keyof typeof payload];
        }
      });

      await onSave(payload);
      onOpenChange(false);
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to save record.", variant: "destructive" });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit' : 'Add'} {title}</DialogTitle>
          <DialogDescription>
            {initialData ? 'Update the details for this record.' : 'Enter the details for the new record.'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 flex-1 overflow-y-auto px-2">
          {fields.map(field => (
            <div key={field.name} className="space-y-2">
              <label className="text-sm font-medium">{field.label}</label>
              {field.type === "reference" && field.referenceModel ? (
                <SearchableReferenceSelect
                  referenceModel={field.referenceModel}
                  filterBy={field.filterBy}
                  filterValue={field.filterBy ? (formData[field.filterBy as keyof typeof formData] as string) : undefined}
                  value={(formData[field.name as keyof typeof formData] as string) || ""}
                  onChange={(val) => handleChange(field.name, val)}
                  disabled={isPending}
                />
              ) : field.type === "select" && field.options ? (
                <Select
                  value={(formData[field.name as keyof IMasterEntity] as string) || ""}
                  onValueChange={(val) => handleChange(field.name, val)}
                  disabled={isPending}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={`Select ${field.label}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input 
                  type={field.type || "text"}
                  value={(formData[field.name as keyof IMasterEntity] as string) || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  disabled={isPending}
                />
              )}
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>Cancel</Button>
          <Button onClick={handleSave} disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
