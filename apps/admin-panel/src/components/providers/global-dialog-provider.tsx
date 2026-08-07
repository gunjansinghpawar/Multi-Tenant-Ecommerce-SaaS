"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardContent, Button } from "@commercex/ui";
import { AlertTriangleIcon, CheckCircle2Icon, InfoIcon, XIcon, KeyboardIcon } from "lucide-react";
import { ImportWizard } from "../wizards/import-wizard";
import { MediaPicker } from "../wizards/media-picker";

type DialogContextType = {
  // System Alerts
  alert: (title: string, message: string, type?: "info" | "success" | "warning" | "error") => void;
  confirm: (title: string, message: string, onConfirm: () => void) => void;
  
  // Wizards & Pickers
  openImportWizard: (entityName: string) => void;
  openExportWizard: (entityName: string) => void;
  openMediaPicker: (onSelect: (url: string) => void) => void;
  openThemeSelector: () => void;
  openColorPicker: () => void;
  openKeyboardShortcuts: () => void;
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export function useGlobalDialogs() {
  const context = useContext(DialogContext);
  if (!context) throw new Error("useGlobalDialogs must be used within GlobalDialogProvider");
  return context;
}

export function GlobalDialogProvider({ children }: { children: ReactNode }) {
  // Simple Alert State
  const [alertData, setAlertData] = useState<{ isOpen: boolean, title: string, message: string, type: string } | null>(null);
  
  // Confirmation State
  const [confirmData, setConfirmData] = useState<{ isOpen: boolean, title: string, message: string, onConfirm: () => void } | null>(null);

  // Wizard States
  const [importWizardEntity, setImportWizardEntity] = useState<string | null>(null);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  const value: DialogContextType = {
    alert: (title, message, type = "info") => setAlertData({ isOpen: true, title, message, type }),
    confirm: (title, message, onConfirm) => setConfirmData({ isOpen: true, title, message, onConfirm }),
    openImportWizard: (entity) => setImportWizardEntity(entity),
    openExportWizard: (entity) => setAlertData({ isOpen: true, title: "Export Started", message: `Exporting ${entity} in the background...`, type: "success" }),
    openMediaPicker: (onSelect) => setIsMediaPickerOpen(true),
    openThemeSelector: () => setAlertData({ isOpen: true, title: "Theme Selector", message: "Theme Selector module opening...", type: "info" }),
    openColorPicker: () => setAlertData({ isOpen: true, title: "Color Picker", message: "Color Picker module opening...", type: "info" }),
    openKeyboardShortcuts: () => setIsShortcutsOpen(true),
  };

  return (
    <DialogContext.Provider value={value}>
      {children}

      {/* Basic Alert Modal */}
      {alertData?.isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-sm animate-in zoom-in-95 duration-100">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                {alertData.type === 'success' && <CheckCircle2Icon className="h-5 w-5 text-emerald-500" />}
                {alertData.type === 'error' && <XIcon className="h-5 w-5 text-destructive" />}
                {alertData.type === 'warning' && <AlertTriangleIcon className="h-5 w-5 text-orange-500" />}
                {alertData.type === 'info' && <InfoIcon className="h-5 w-5 text-blue-500" />}
                {alertData.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{alertData.message}</p>
              <div className="flex justify-end">
                <Button onClick={() => setAlertData(null)}>OK</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmData?.isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-md animate-in zoom-in-95 duration-100">
            <CardHeader>
              <CardTitle>{confirmData.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-6">{confirmData.message}</p>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setConfirmData(null)}>Cancel</Button>
                <Button onClick={() => {
                  confirmData.onConfirm();
                  setConfirmData(null);
                }}>Confirm Action</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Keyboard Shortcuts Modal */}
      {isShortcutsOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-lg">
            <CardHeader className="border-b pb-4">
              <CardTitle className="flex items-center gap-2"><KeyboardIcon className="h-5 w-5" /> Keyboard Shortcuts</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 grid grid-cols-2 gap-4">
              <div className="flex justify-between items-center"><span className="text-sm">Global Search</span><kbd className="px-2 py-1 bg-slate-100 rounded text-xs font-mono">Ctrl + K</kbd></div>
              <div className="flex justify-between items-center"><span className="text-sm">Create New</span><kbd className="px-2 py-1 bg-slate-100 rounded text-xs font-mono">Alt + N</kbd></div>
              <div className="flex justify-between items-center"><span className="text-sm">Save Changes</span><kbd className="px-2 py-1 bg-slate-100 rounded text-xs font-mono">Ctrl + S</kbd></div>
              <div className="flex justify-between items-center"><span className="text-sm">Close Modal</span><kbd className="px-2 py-1 bg-slate-100 rounded text-xs font-mono">Esc</kbd></div>
            </CardContent>
            <div className="p-4 border-t flex justify-end">
              <Button onClick={() => setIsShortcutsOpen(false)}>Close</Button>
            </div>
          </Card>
        </div>
      )}

      {/* Wizards */}
      <ImportWizard 
        isOpen={!!importWizardEntity} 
        entityName={importWizardEntity || ""} 
        onClose={() => setImportWizardEntity(null)} 
      />

      <MediaPicker 
        isOpen={isMediaPickerOpen} 
        onClose={() => setIsMediaPickerOpen(false)} 
      />

    </DialogContext.Provider>
  );
}
