"use client";

import React, { useState } from "react";
import { 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  Form,
  RHFInput
} from "@commercex/ui";
import { 
  MoreVerticalIcon, EditIcon, TrashIcon, CopyIcon, ArchiveIcon, 
  RotateCcwIcon, GlobeIcon, EyeOffIcon, EyeIcon, HistoryIcon, 
  ActivityIcon, FileTextIcon, PaperclipIcon, MessageSquareIcon, 
  StickyNoteIcon, Share2Icon, CheckCircleIcon, XIcon
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface EntityRowActionsProps {
  id: string | number;
  entityName: string;
  onAction?: (action: string, id: string | number, data?: any) => void;
}

// Simple Modal Component since we don't know exact Dialog exports
function ActionModal({ isOpen, onClose, title, desc, children }: any) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-md animate-in fade-in zoom-in-95 duration-200">
        <CardHeader className="flex flex-row items-start justify-between pb-2 border-b mb-4">
          <div>
            <CardTitle>{title}</CardTitle>
            {desc && <CardDescription>{desc}</CardDescription>}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6 -mr-2 -mt-2">
            <XIcon className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </div>
  );
}

export function EntityRowActions({ id, entityName, onAction }: EntityRowActionsProps) {
  const [open, setOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Forms setup
  const noteForm = useForm({ defaultValues: { note: "" }, resolver: zodResolver(z.object({ note: z.string().min(1) })) });
  const shareForm = useForm({ defaultValues: { email: "" }, resolver: zodResolver(z.object({ email: z.string().email() })) });
  const duplicateForm = useForm({ defaultValues: { name: `Copy of ${entityName}` }, resolver: zodResolver(z.object({ name: z.string().min(1) })) });

  const handleAction = (action: string) => {
    setOpen(false);
    if (['add_note', 'share', 'duplicate', 'delete', 'archive', 'request_approval'].includes(action)) {
      setActiveModal(action);
    } else {
      onAction?.(action, id);
      alert(`Action: ${action} executed on ${entityName} (ID: ${id})`);
    }
  };

  const submitModal = (action: string, data?: any) => {
    onAction?.(action, id, data);
    setActiveModal(null);
    alert(`Success: ${action} completed for ${entityName}`);
  };

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" onClick={() => setOpen(!open)}>
        <MoreVerticalIcon className="h-4 w-4" />
      </Button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border rounded-md shadow-lg z-40 py-1">
          <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b mb-1">
            Standard Actions
          </div>
          <button onClick={() => handleAction('read')} className="w-full text-left px-4 py-1.5 text-sm hover:bg-muted flex items-center"><EyeIcon className="mr-2 h-4 w-4" /> View Details</button>
          <button onClick={() => handleAction('edit')} className="w-full text-left px-4 py-1.5 text-sm hover:bg-muted flex items-center"><EditIcon className="mr-2 h-4 w-4" /> Edit {entityName}</button>
          
          <div className="px-3 py-2 mt-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-y mb-1">
            Management
          </div>
          <button onClick={() => handleAction('duplicate')} className="w-full text-left px-4 py-1.5 text-sm hover:bg-muted flex items-center"><CopyIcon className="mr-2 h-4 w-4" /> Duplicate / Clone</button>
          <button onClick={() => handleAction('publish')} className="w-full text-left px-4 py-1.5 text-sm hover:bg-muted flex items-center"><GlobeIcon className="mr-2 h-4 w-4" /> Publish</button>
          <button onClick={() => handleAction('unpublish')} className="w-full text-left px-4 py-1.5 text-sm hover:bg-muted flex items-center"><EyeOffIcon className="mr-2 h-4 w-4" /> Unpublish</button>
          <button onClick={() => handleAction('archive')} className="w-full text-left px-4 py-1.5 text-sm hover:bg-muted flex items-center text-orange-600"><ArchiveIcon className="mr-2 h-4 w-4" /> Archive</button>
          <button onClick={() => handleAction('restore')} className="w-full text-left px-4 py-1.5 text-sm hover:bg-muted flex items-center"><RotateCcwIcon className="mr-2 h-4 w-4" /> Restore</button>
          
          <div className="px-3 py-2 mt-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-y mb-1">
            Collaboration & Audit
          </div>
          <button onClick={() => handleAction('add_note')} className="w-full text-left px-4 py-1.5 text-sm hover:bg-muted flex items-center"><StickyNoteIcon className="mr-2 h-4 w-4" /> Add Note</button>
          <button onClick={() => handleAction('share')} className="w-full text-left px-4 py-1.5 text-sm hover:bg-muted flex items-center"><Share2Icon className="mr-2 h-4 w-4" /> Share</button>
          <button onClick={() => handleAction('comments')} className="w-full text-left px-4 py-1.5 text-sm hover:bg-muted flex items-center"><MessageSquareIcon className="mr-2 h-4 w-4" /> Comments</button>
          <button onClick={() => handleAction('attachments')} className="w-full text-left px-4 py-1.5 text-sm hover:bg-muted flex items-center"><PaperclipIcon className="mr-2 h-4 w-4" /> Attachments</button>
          <button onClick={() => handleAction('request_approval')} className="w-full text-left px-4 py-1.5 text-sm hover:bg-muted flex items-center"><CheckCircleIcon className="mr-2 h-4 w-4" /> Request Approval</button>
          <button onClick={() => handleAction('history')} className="w-full text-left px-4 py-1.5 text-sm hover:bg-muted flex items-center"><HistoryIcon className="mr-2 h-4 w-4" /> Version History</button>
          <button onClick={() => handleAction('timeline')} className="w-full text-left px-4 py-1.5 text-sm hover:bg-muted flex items-center"><ActivityIcon className="mr-2 h-4 w-4" /> Activity Timeline</button>
          <button onClick={() => handleAction('audit_logs')} className="w-full text-left px-4 py-1.5 text-sm hover:bg-muted flex items-center"><FileTextIcon className="mr-2 h-4 w-4" /> Audit Logs</button>
          
          <div className="border-t my-1"></div>
          <button onClick={() => handleAction('delete')} className="w-full text-left px-4 py-1.5 text-sm hover:bg-destructive/10 text-destructive flex items-center"><TrashIcon className="mr-2 h-4 w-4" /> Delete</button>
        </div>
      )}

      {/* Modals */}
      <ActionModal isOpen={activeModal === 'delete'} onClose={() => setActiveModal(null)} title="Confirm Deletion" desc={`Are you sure you want to delete this ${entityName}?`}>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setActiveModal(null)}>Cancel</Button>
          <Button variant="destructive" onClick={() => submitModal('delete')}>Yes, Delete</Button>
        </div>
      </ActionModal>

      <ActionModal isOpen={activeModal === 'archive'} onClose={() => setActiveModal(null)} title="Archive Record" desc={`Archiving this ${entityName} will hide it from active views.`}>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setActiveModal(null)}>Cancel</Button>
          <Button onClick={() => submitModal('archive')} className="bg-orange-600 hover:bg-orange-700">Archive</Button>
        </div>
      </ActionModal>

      <ActionModal isOpen={activeModal === 'request_approval'} onClose={() => setActiveModal(null)} title="Request Approval" desc="Send this record to a manager for review.">
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setActiveModal(null)}>Cancel</Button>
          <Button onClick={() => submitModal('request_approval')}>Send Request</Button>
        </div>
      </ActionModal>

      <ActionModal isOpen={activeModal === 'add_note'} onClose={() => setActiveModal(null)} title="Add Internal Note" desc="Notes are only visible to staff members.">
        <Form {...noteForm}>
          <form onSubmit={noteForm.handleSubmit((data) => submitModal('add_note', data))} className="space-y-4">
            <RHFInput name="note" label="Note Content" />
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setActiveModal(null)}>Cancel</Button>
              <Button type="submit">Save Note</Button>
            </div>
          </form>
        </Form>
      </ActionModal>

      <ActionModal isOpen={activeModal === 'share'} onClose={() => setActiveModal(null)} title="Share Record" desc="Send a secure link to this record via email.">
        <Form {...shareForm}>
          <form onSubmit={shareForm.handleSubmit((data) => submitModal('share', data))} className="space-y-4">
            <RHFInput name="email" label="Recipient Email" />
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setActiveModal(null)}>Cancel</Button>
              <Button type="submit">Send Invite</Button>
            </div>
          </form>
        </Form>
      </ActionModal>

      <ActionModal isOpen={activeModal === 'duplicate'} onClose={() => setActiveModal(null)} title="Duplicate Record" desc="Create a copy of this record with a new name.">
        <Form {...duplicateForm}>
          <form onSubmit={duplicateForm.handleSubmit((data) => submitModal('duplicate', data))} className="space-y-4">
            <RHFInput name="name" label="New Record Name" />
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setActiveModal(null)}>Cancel</Button>
              <Button type="submit">Duplicate</Button>
            </div>
          </form>
        </Form>
      </ActionModal>
    </div>
  );
}

export function EntityBulkActions({ selectedCount, onAction }: { selectedCount: number, onAction?: (action: string) => void }) {
  if (selectedCount === 0) return null;

  return (
    <div className="bg-primary/10 text-primary px-4 py-2 rounded-md flex items-center justify-between mb-4 border border-primary/20">
      <span className="text-sm font-medium">{selectedCount} items selected</span>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="bg-white hover:bg-slate-50" onClick={() => onAction?.('bulk_edit')}>Bulk Edit</Button>
        <Button variant="outline" size="sm" className="bg-white hover:bg-slate-50" onClick={() => onAction?.('bulk_export')}>Export</Button>
        <Button variant="outline" size="sm" className="bg-white hover:bg-slate-50 text-orange-600 border-orange-200" onClick={() => onAction?.('bulk_archive')}>Archive</Button>
        <Button variant="outline" size="sm" className="bg-white hover:bg-slate-50 text-destructive border-destructive/30" onClick={() => onAction?.('bulk_delete')}>Delete</Button>
      </div>
    </div>
  );
}
