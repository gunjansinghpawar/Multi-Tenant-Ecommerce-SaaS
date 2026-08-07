"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./dialog"
import { Button } from "./button"
import { Input } from "./input"
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  XCircle,
  Loader2,
  Trash2,
} from "lucide-react"

export interface BaseDialogVariantProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: React.ReactNode
  children?: React.ReactNode
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void
  isLoading?: boolean
}

// 1. Confirmation Dialog
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  isLoading,
}: BaseDialogVariantProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            onClick={() => {
              onCancel?.()
              onOpenChange(false)
            }}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button onClick={onConfirm} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// 2. Delete Dialog (with typed confirmation)
export interface DeleteDialogProps extends BaseDialogVariantProps {
  requireTypedConfirmation?: boolean
  confirmationPhrase?: string
}

export function DeleteDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  isLoading,
  requireTypedConfirmation = false,
  confirmationPhrase = "DELETE",
}: DeleteDialogProps) {
  const [typedValue, setTypedValue] = React.useState("")
  const isConfirmDisabled = isLoading || (requireTypedConfirmation && typedValue !== confirmationPhrase)

  React.useEffect(() => {
    if (open) setTypedValue("")
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 mb-4">
            <Trash2 className="h-6 w-6 text-destructive" />
          </div>
          <DialogTitle className="text-center">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-center">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        
        {requireTypedConfirmation && (
          <div className="my-4">
            <p className="mb-2 text-sm text-muted-foreground">
              Please type <strong>{confirmationPhrase}</strong> to confirm.
            </p>
            <Input
              value={typedValue}
              onChange={(e) => setTypedValue(e.target.value)}
              placeholder={confirmationPhrase}
            />
          </div>
        )}

        <DialogFooter className="mt-4 sm:justify-center flex-col sm:flex-row gap-2 sm:space-x-0">
          <Button
            variant="outline"
            onClick={() => {
              onCancel?.()
              onOpenChange(false)
            }}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {cancelText}
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isConfirmDisabled}
            className="w-full sm:w-auto"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// 3. Warning Dialog
export function WarningDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "Proceed",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  isLoading,
}: BaseDialogVariantProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10 mb-4">
            <AlertTriangle className="h-6 w-6 text-amber-500" />
          </div>
          <DialogTitle className="text-center">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-center">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <DialogFooter className="mt-4 sm:justify-center flex-col sm:flex-row gap-2 sm:space-x-0">
          <Button
            variant="outline"
            onClick={() => {
              onCancel?.()
              onOpenChange(false)
            }}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {cancelText}
          </Button>
          <Button
            className="bg-amber-500 hover:bg-amber-600 text-white w-full sm:w-auto"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// 4. Success Dialog
export function SuccessDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "Got it",
  onConfirm,
}: Omit<BaseDialogVariantProps, "cancelText" | "onCancel" | "isLoading">) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 mb-4">
            <CheckCircle2 className="h-6 w-6 text-emerald-500" />
          </div>
          <DialogTitle className="text-center">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-center">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <DialogFooter className="mt-4 sm:justify-center">
          <Button
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white"
            onClick={() => {
              onConfirm?.()
              onOpenChange(false)
            }}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// 5. Information Dialog
export function InfoDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  confirmText = "Close",
}: Omit<BaseDialogVariantProps, "cancelText" | "onCancel" | "isLoading" | "onConfirm">) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
              <Info className="h-5 w-5 text-blue-500" />
            </div>
            <DialogTitle>{title}</DialogTitle>
          </div>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children && <div className="py-4">{children}</div>}
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>{confirmText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// 6. Error Dialog
export function ErrorDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "Close",
  onConfirm,
}: Omit<BaseDialogVariantProps, "cancelText" | "onCancel" | "isLoading">) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 mb-4">
            <XCircle className="h-6 w-6 text-destructive" />
          </div>
          <DialogTitle className="text-center">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-center">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <DialogFooter className="mt-4 sm:justify-center">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => {
              onConfirm?.()
              onOpenChange(false)
            }}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// 8. Restore Dialog
export function RestoreDialog({
  open,
  onOpenChange,
  title = "Restore Item",
  description = "Are you sure you want to restore this item from the archive?",
  confirmText = "Restore",
  cancelText = "Cancel",
  onConfirm,
  isLoading,
}: BaseDialogVariantProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button onClick={onConfirm} disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700 text-white">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// 9. Archive Dialog
export function ArchiveDialog({
  open,
  onOpenChange,
  title = "Archive Item",
  description = "Are you sure you want to archive this item?",
  confirmText = "Archive",
  cancelText = "Cancel",
  onConfirm,
  isLoading,
}: BaseDialogVariantProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button onClick={onConfirm} disabled={isLoading} className="bg-amber-600 hover:bg-amber-700 text-white">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// 10. Preview Dialog
export function PreviewDialog({
  open,
  onOpenChange,
  title = "Item Preview",
  children,
}: Pick<BaseDialogVariantProps, "open" | "onOpenChange" | "title"> & { children?: React.ReactNode }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="py-4">{children}</div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// 11. Discard / Unsaved Changes Dialog
export function DiscardChangesDialog({
  open,
  onOpenChange,
  title = "Discard unsaved changes?",
  description = "You have unsaved changes that will be lost if you leave. Are you sure?",
  onConfirm,
}: BaseDialogVariantProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Keep Editing</Button>
          <Button variant="destructive" onClick={onConfirm}>Discard Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// 12. Import Wizard Dialog
export function ImportWizardDialog({
  open,
  onOpenChange,
  title = "Import Data Wizard",
  onImport,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  onImport?: (file: File) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Upload a CSV or JSON file to import data into this module.</DialogDescription>
        </DialogHeader>
        <div className="py-6 border-2 border-dashed rounded-xl flex flex-col items-center justify-center my-4 bg-muted/20">
          <p className="text-sm text-muted-foreground mb-2">Drag & drop your file here or click to browse</p>
          <Input type="file" className="hidden" id="wizard-file-input" />
          <Button variant="outline" onClick={() => document.getElementById('wizard-file-input')?.click()}>
            Select File
          </Button>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={() => onOpenChange(false)}>Start Import Process</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// 13. Export Wizard Dialog
export function ExportWizardDialog({
  open,
  onOpenChange,
  title = "Export Data Wizard",
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Select format and options for exporting items.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Export Format</label>
            <select className="w-full h-10 px-3 border rounded-md bg-background">
              <option value="csv">CSV (Spreadsheet)</option>
              <option value="json">JSON Format</option>
              <option value="xlsx">Excel Workbook (.xlsx)</option>
            </select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={() => onOpenChange(false)}>Download Export</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// 14. Bulk Action Wizard Dialog
export function BulkActionWizardDialog({
  open,
  onOpenChange,
  selectedCount = 0,
  actionName = "Process",
  onConfirm,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedCount?: number
  actionName?: string
  onConfirm?: () => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Bulk {actionName} ({selectedCount} items)</DialogTitle>
          <DialogDescription>Apply this bulk operation to all selected records?</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={() => { onConfirm?.(); onOpenChange(false); }}>
            Confirm Bulk {actionName}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// 15. Permission / Assign / Move / Duplicate / Share / Activity / Filter / Search / Help Dialogs
export function GenericModuleActionDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  confirmText = "Submit",
  onConfirm,
}: BaseDialogVariantProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children && <div className="py-4">{children}</div>}
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          {onConfirm && <Button onClick={() => { onConfirm(); onOpenChange(false); }}>{confirmText}</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

