"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  Button,
  useToast,
} from "@commercex/ui";
import { IMasterEntity } from "@commercex/types/src/masters.types";
import { AlertTriangle, Trash2, ShieldOff } from "lucide-react";

interface MasterDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: IMasterEntity | null;
  onConfirm: (item: IMasterEntity, forceDeactivate: boolean) => Promise<void>;
  checkDependencies?: (item: IMasterEntity) => Promise<{ hasDependencies: boolean; message: string }>;
}

export function MasterDeleteDialog({
  open,
  onOpenChange,
  item,
  onConfirm,
  checkDependencies,
}: MasterDeleteDialogProps) {
  const [isPending, setIsPending]               = useState(false);
  const [checking, setChecking]                 = useState(false);
  const [dependencyWarning, setDependencyWarning] = useState<string | null>(null);
  const { toast } = useToast();

  // Run dependency check whenever dialog opens
  useEffect(() => {
    if (!open || !item) { setDependencyWarning(null); return; }
    if (!checkDependencies) { setDependencyWarning(null); return; }

    setChecking(true);
    checkDependencies(item)
      .then(res => setDependencyWarning(res.hasDependencies ? res.message : null))
      .catch(() => setDependencyWarning("Unable to verify dependencies."))
      .finally(() => setChecking(false));
  }, [open, item, checkDependencies]);

  if (!item) return null;

  const handleAction = async (forceDeactivate: boolean) => {
    try {
      setIsPending(true);
      await onConfirm(item, forceDeactivate);
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to process request.",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  const isBusy = isPending || checking;
  const hasBlock = !!dependencyWarning;

  return (
    <Dialog open={open} onOpenChange={v => !isBusy && onOpenChange(v)}>
      <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden">

        {/* Header band — red for delete, amber when blocked */}
        <div className={`px-6 pt-6 pb-5 flex items-start gap-4 ${hasBlock ? "bg-amber-500/10" : "bg-destructive/10"}`}>
          <div className={`rounded-full p-2.5 shrink-0 mt-0.5 ${hasBlock ? "bg-amber-500/15" : "bg-destructive/15"}`}>
            {hasBlock
              ? <AlertTriangle className="h-5 w-5 text-amber-500" />
              : <Trash2 className="h-5 w-5 text-destructive" />
            }
          </div>
          <div className="flex-1 min-w-0">
            <DialogTitle className={`text-base font-semibold ${hasBlock ? "text-amber-600 dark:text-amber-400" : "text-destructive"}`}>
              {hasBlock ? "Cannot Delete" : `Delete "${item.name}"`}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-1 leading-relaxed">
              {hasBlock
                ? "This record has active dependencies and cannot be deleted."
                : "This action is permanent and cannot be undone."}
            </DialogDescription>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 border-t space-y-3">
          {checking ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
              <span className="h-3.5 w-3.5 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
              Checking dependencies…
            </div>
          ) : hasBlock ? (
            <div className="rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-950/30 p-4 space-y-2">
              <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">
                Dependency Warning
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-300">{dependencyWarning}</p>
              <p className="text-sm text-amber-600 dark:text-amber-400 mt-2">
                You can <strong>deactivate</strong> this record instead — it will be hidden from new selections
                but existing data will remain intact.
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4">
              <p className="text-sm text-destructive font-medium">
                You are about to permanently delete{" "}
                <span className="font-bold">"{item.name}"</span>.
              </p>
              <p className="text-xs text-muted-foreground mt-1.5">
                This record will be removed from the database. Any associated data may be affected.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-muted/20">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isBusy}
            className="min-w-[80px]"
          >
            Cancel
          </Button>

          {hasBlock ? (
            <Button
              variant="secondary"
              onClick={() => handleAction(true)}
              disabled={isBusy}
              className="min-w-[140px] gap-2 border-amber-300 hover:bg-amber-50"
            >
              {isBusy ? (
                <span className="h-3.5 w-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <ShieldOff className="h-3.5 w-3.5" />
              )}
              {isBusy ? "Processing…" : "Deactivate Instead"}
            </Button>
          ) : (
            <Button
              variant="destructive"
              onClick={() => handleAction(false)}
              disabled={isBusy}
              className="min-w-[140px] gap-2"
            >
              {isBusy ? (
                <span className="h-3.5 w-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <Trash2 className="h-3.5 w-3.5" />
              )}
              {isBusy ? "Deleting…" : "Delete Permanently"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
