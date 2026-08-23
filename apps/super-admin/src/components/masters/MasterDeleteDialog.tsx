"use client";

import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter,
  Button,
  useToast
} from "@commercex/ui";
import { IMasterEntity } from "@commercex/types/src/masters.types";
import { AlertTriangleIcon } from "lucide-react";

interface MasterDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: IMasterEntity | null;
  onConfirm: (item: IMasterEntity, forceDeactivate: boolean) => Promise<void>;
  checkDependencies?: (item: IMasterEntity) => Promise<{ hasDependencies: boolean; message: string }>;
}

export function MasterDeleteDialog({ open, onOpenChange, item, onConfirm, checkDependencies }: MasterDeleteDialogProps) {
  const [isPending, setIsPending] = useState(false);
  const [dependencyWarning, setDependencyWarning] = useState<string | null>(null);
  const { toast } = useToast();

  React.useEffect(() => {
    if (open && item && checkDependencies) {
      setIsPending(true);
      checkDependencies(item).then(res => {
        if (res.hasDependencies) {
          setDependencyWarning(res.message);
        } else {
          setDependencyWarning(null);
        }
      }).catch(() => {
        setDependencyWarning("Unable to verify dependencies.");
      }).finally(() => {
        setIsPending(false);
      });
    } else {
      setDependencyWarning(null);
    }
  }, [open, item, checkDependencies]);

  if (!item) return null;

  const handleDelete = async (forceDeactivate: boolean = false) => {
    try {
      setIsPending(true);
      await onConfirm(item, forceDeactivate);
      onOpenChange(false);
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to process request.", variant: "destructive" });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete {item.name}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this record?
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {dependencyWarning ? (
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-md flex gap-3 text-orange-800">
              <AlertTriangleIcon className="w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">Action Blocked</p>
                <p className="text-sm mt-1">{dependencyWarning}</p>
                <p className="text-sm mt-2 font-medium">You can deactivate it instead to hide it from new selections.</p>
              </div>
            </div>
          ) : (
            <p className="text-sm">This action cannot be undone unless it is a soft-delete enabled entity.</p>
          )}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>Cancel</Button>
          {dependencyWarning ? (
            <Button variant="secondary" onClick={() => handleDelete(true)} disabled={isPending}>
              {isPending ? "Processing..." : "Deactivate Instead"}
            </Button>
          ) : (
            <Button variant="destructive" onClick={() => handleDelete(false)} disabled={isPending}>
              {isPending ? "Deleting..." : "Delete Permanently"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
