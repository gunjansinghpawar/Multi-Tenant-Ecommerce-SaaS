"use client";

/**
 * ConfirmDialog — a reusable, accessible confirmation popup.
 *
 * Supports three intents:
 *  • "danger"  — red destructive header (delete, revoke, suspend)
 *  • "warning" — amber header (edit with unsaved changes, bulk actions)
 *  • "info"    — blue neutral header (informational confirmations)
 *
 * Usage:
 *   <ConfirmDialog
 *     open={open}
 *     onOpenChange={setOpen}
 *     intent="danger"
 *     title="Delete Provider"
 *     description="This will permanently remove the provider and all its credentials. This action cannot be undone."
 *     confirmLabel="Delete Permanently"
 *     onConfirm={handleDelete}
 *   />
 */

import React, { useState } from "react";
import {
  Dialog, DialogContent, DialogTitle, DialogDescription, Button,
} from "@commercex/ui";
import { AlertTriangle, Trash2, Info, ShieldAlert } from "lucide-react";

export type ConfirmIntent = "danger" | "warning" | "info";

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  intent?: ConfirmIntent;
  title: string;
  description?: string;
  /** Optional extra detail rendered below description (JSX allowed) */
  detail?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Called when user confirms — may return a Promise (dialog stays open until resolved) */
  onConfirm: () => void | Promise<void>;
  /** Disable the confirm button while the parent is loading */
  loading?: boolean;
}

const INTENT_CONFIG = {
  danger: {
    headerBg: "bg-destructive/10",
    iconBg:   "bg-destructive/15",
    icon:     <Trash2 className="h-5 w-5 text-destructive" />,
    titleCls: "text-destructive",
    btnVariant: "destructive" as const,
  },
  warning: {
    headerBg: "bg-amber-500/10",
    iconBg:   "bg-amber-500/15",
    icon:     <AlertTriangle className="h-5 w-5 text-amber-500" />,
    titleCls: "text-amber-600 dark:text-amber-400",
    btnVariant: "default" as const,
  },
  info: {
    headerBg: "bg-primary/10",
    iconBg:   "bg-primary/15",
    icon:     <Info className="h-5 w-5 text-primary" />,
    titleCls: "text-foreground",
    btnVariant: "default" as const,
  },
};

export function ConfirmDialog({
  open,
  onOpenChange,
  intent = "danger",
  title,
  description,
  detail,
  confirmLabel = intent === "danger" ? "Delete" : "Confirm",
  cancelLabel  = "Cancel",
  onConfirm,
  loading = false,
}: ConfirmDialogProps) {
  const [pending, setPending] = useState(false);
  const cfg = INTENT_CONFIG[intent];

  const handleConfirm = async () => {
    setPending(true);
    try {
      await onConfirm();
      onOpenChange(false);
    } finally {
      setPending(false);
    }
  };

  const isBusy = pending || loading;

  return (
    <Dialog open={open} onOpenChange={v => !isBusy && onOpenChange(v)}>
      <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden">

        {/* Tinted header band */}
        <div className={`${cfg.headerBg} px-6 pt-6 pb-5 flex items-start gap-4`}>
          <div className={`${cfg.iconBg} rounded-full p-2.5 shrink-0 mt-0.5`}>
            {cfg.icon}
          </div>
          <div className="space-y-1 flex-1 min-w-0">
            <DialogTitle className={`text-base font-semibold ${cfg.titleCls}`}>
              {title}
            </DialogTitle>
            {description && (
              <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </DialogDescription>
            )}
          </div>
        </div>

        {/* Optional extra detail body */}
        {detail && (
          <div className="px-6 py-4 border-t text-sm text-muted-foreground">
            {detail}
          </div>
        )}

        {/* Footer */}
        <div className={`flex items-center justify-end gap-3 px-6 py-4 ${detail ? "" : "border-t"} bg-muted/20`}>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isBusy}
            className="min-w-[80px]"
          >
            {cancelLabel}
          </Button>
          <Button
            variant={cfg.btnVariant}
            onClick={handleConfirm}
            disabled={isBusy}
            className="min-w-[100px] gap-2"
          >
            {isBusy && (
              <span className="h-3.5 w-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            )}
            {isBusy ? "Please wait…" : confirmLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
